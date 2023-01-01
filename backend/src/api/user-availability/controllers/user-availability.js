'use strict';

/**
 *  user-availability controller
 */

const _ = require('lodash');
const utils = require('@strapi/utils');
const { getService } = require('@strapi/plugin-users-permissions/server/utils');
const { validateUpdateUserBody } = require('@strapi/plugin-users-permissions/server/controllers/validation/user');

const { sanitize } = utils;
const { ApplicationError, ValidationError, NotFoundError } = utils.errors;

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-availability.user-availability', ({strapi}) => ({    
    /**
     * Find user's availability
     * @return {Object} 
     */
     async find(ctx) {
        // some logic here
        const { data, meta } = await super.find(ctx);
        // some more logic

        const response = await strapi.entityService.findMany('api::user-availability.user-availability', {
            populate: { 
                day: {
                    populate: {
                        times: true
                    }
                }
            }
        })
      
        return response;
    },
      

    async create(ctx) {
        // const authUser = ctx.state.user
        const { data } = ctx.request.body

        const response = await strapi.entityService.create('api::user-availability.user-availability', 
            { data }
        )

        ctx.send(response);
    },

    /**
     * Update a user's availability
     * @return {Object} 
    */
    async updateMe(ctx) {
        const authUser = ctx.state.user;

        const user = await getService('user').fetch(authUser.id);

        if (!user) {
            throw new NotFoundError(`User not found`);
        }

        await validateUpdateUserBody(ctx.request.body);

        const { data } = ctx.request.body;

        const userInfo = await strapi.entityService.findOne('plugin::users-permissions.user', authUser.id, {
            populate: { user_availability: true }
        })

        const updateData = await strapi.entityService.update('api::user-availability.user-availability', userInfo.user_availability.id, 
            { data }
        )

        ctx.send(updateData);
    }
}));
