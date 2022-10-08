'use strict';

/**
 * user-availability service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-availability.user-availability');
