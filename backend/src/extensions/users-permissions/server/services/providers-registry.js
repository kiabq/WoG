'use strict';

const { strict: assert } = require('assert');

const getInitialProviders = ({ purest }) => ({
  async discord({ access_token }) {
    const discord = purest({ provider: 'discord' });

    let user = await discord
      .get('users/@me')
      .auth(access_token)
      .request()
      .then(({ body }) => {
        let username = body.username;
        return {
          username,
          email: body.email,
          avatar: body.avatar,
          userId: body.id
        };
      });

    let guilds = await discord
      .get('users/@me/guilds')
      .auth(access_token)
      .request()
      .then(({ body }) => {
        // Return object containing all guilds that user is participating in
        return {
          body
        };
      });

    return([user, guilds]);
  },
  
});

module.exports = () => {
  const purest = require('purest');

  const providersCallbacks = getInitialProviders({ purest });

  return {
    register(providerName, provider) {
      assert(typeof providerName === 'string', 'Provider name must be a string');
      assert(typeof provider === 'function', 'Provider callback must be a function');

      providersCallbacks[providerName] = provider({ purest });
    },

    async run({ provider, access_token, query, providers }) {
      if (!providersCallbacks[provider]) {
        throw new Error('Unknown provider.');
      }

      const providerCb = providersCallbacks[provider];

      return providerCb({ access_token, query, providers });
    },
  };
};
