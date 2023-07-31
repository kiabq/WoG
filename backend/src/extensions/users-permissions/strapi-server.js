'use strict';
const {
  getPaginationInfo,
  transformPaginationResponse,
  convertPagedToStartLimit
} = require("@strapi/strapi/lib/core-api/service/pagination");
const { sanitize } = require('@strapi/utils');
const { contentAPI } = sanitize;
const uid = 'plugin::users-permissions.user';

const sanitizeQuery = async (ctx) => {
  const contentType = strapi.contentType(uid)
  return await contentAPI.input(ctx.query, contentType, ctx.state.auth)
};

const sanitizeOutput = async (user, ctx) => {
  const schema = strapi.getModel(uid);
  const { auth } = ctx.state;

  return sanitize.contentAPI.output(user, schema, { auth });
};

module.exports = (plugin) => {
  plugin.routes['content-api'].routes.push(
    {
      method: 'POST',
      path: '/users/me/update',
      handler: 'user.updateMe',
      config: {
        prefix: '',
      },
    },
  );
  plugin.bootstrap = require('./server/bootstrap');
  plugin.controllers = require('./server/controllers');
  plugin.controllers.user.find = async (ctx) => {
    const sanitizedQuery = await sanitizeQuery(ctx);
    const { pagination = {}, ...restOfCtxQueries } = sanitizedQuery;
    const queryPagination = convertPagedToStartLimit(pagination);
    const params = {
      ...restOfCtxQueries,
      limit: queryPagination.limit,
      offset: queryPagination.start
    };

    const [users, count] = await strapi.db.query(uid).findWithCount(params);
    const paginationInfo = getPaginationInfo(sanitizedQuery);
    const paginationResult = transformPaginationResponse(
      paginationInfo,
      count
    );

    const data = await Promise.all(
      users.map((user) => sanitizeOutput(user, ctx))
    );

    ctx.body = {
      data: data,
      meta: {
        pagination: paginationResult,
      },
    };
  };
  plugin.services = require('./server/services');
  return plugin;
};
