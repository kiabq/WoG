'use strict';

// 'tis file is broken. TODO: Fix :V

const register = require('@strapi/plugin-users-permissions/server/register');
const bootstrap = require('./bootstrap');
const contentTypes = require('@strapi/plugin-users-permissions/server/content-types');
const middlewares = require('@strapi/plugin-users-permissions/server/middlewares');
const services = require('./services');
// const controllers = require('@strapi/plugin-users-permissions/server/controllers');
const controllers = require('./controllers');
const routes = require('@strapi/plugin-users-permissions/server/routes');
const config = require('@strapi/plugin-users-permissions/server/config');

module.exports = () => ({
  register,
  bootstrap,
  config,
  routes,
  controllers,
  contentTypes,
  middlewares,
  services,
});