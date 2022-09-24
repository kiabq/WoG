'use strict';
module.exports = (plugin) => {
  plugin.bootstrap = require('./server/bootstrap');
  plugin.controllers = require('./server/controllers');
  plugin.services['providers'] = require('./server/services/providers');
  plugin.services['providers-registry'] = require('./server/services/providers-registry');

  return plugin;
};
