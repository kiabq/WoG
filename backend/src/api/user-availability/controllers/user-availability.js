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

const sanitizeOutput = (user, ctx) => {
  const schema = strapi.getModel('plugin::users-permissions.user');
  const { auth } = ctx.state;

  return sanitize.contentAPI.output(user, schema, { auth });
};

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-availability.user-availability', ({strapi}) => ({    
    /**
     * 
     * @return {Object} 
     */
    async create(ctx) {
        // const authUser = ctx.state.user
        const { data } = ctx.request.body

        const response = await strapi.entityService.create('api::user-availability.user-availability', 
            { data }
        )

        return response;
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
        );

        const sanitizedData = await sanitizeOutput(updateData, ctx);

        ctx.send(sanitizedData);
    }
}));
