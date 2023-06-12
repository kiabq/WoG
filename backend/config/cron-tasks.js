const axios = require('axios');

async function list(strapi) {
    const entries = await strapi.entityService.findMany('plugin::users-permissions.user', {
        fields: ['username', 'providerId', 'avatar'],
    })

    if (entries && entries.length > 0) {
        for (const entry of entries) {
            const { username, avatar, providerId: pId, id: uId } = entry;

            await axios.get(`https://discord.com/api/v10/users/${pId}`, {
                headers: {
                    'Authorization': `Bot ${process.env.BOT_TOKEN}`
                }
            }).then((res) => {
                const discordUser = res.data.username;
                const discordAvatar = res.data.avatar;

                if (username !== discordUser) {
                    strapi.entityService.update('plugin::users-permissions.user', uId, {
                        data: {
                            username: discordUser
                        }
                    })
                }

                if (avatar !== discordAvatar) {
                    strapi.entityService.update('plugin::users-permissions.user', uId, {
                        data: {
                            avatar: discordAvatar
                        }
                    })
                }
            })
        }   
    }
}

module.exports = {
    '0 * * * * *': ({ strapi }) => {
        list(strapi);
    }
}