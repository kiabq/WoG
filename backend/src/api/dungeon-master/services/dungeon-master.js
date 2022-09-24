'use strict';

/**
 * dungeon-master service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dungeon-master.dungeon-master');
