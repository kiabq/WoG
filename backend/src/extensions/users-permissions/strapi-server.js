'use strict';
module.exports = (plugin) => {
  plugin.routes['content-api'].routes.push(
    {
      method: 'PUT',
      path: '/users/me/update',
      handler: 'user.updateMe',
      config: {
        prefix: '',
      },
    },
  );
  plugin.bootstrap = require('./server/bootstrap');
  plugin.controllers = require('./server/controllers');
  plugin.services = require('./server/services');
  return plugin;
};
