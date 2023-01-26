'use strict';

/**
 * Module dependencies.
 */

// Public node modules.
const _ = require('lodash');
const urlJoin = require('url-join');

const { getAbsoluteServerUrl } = require('@strapi/utils');
const { getService } = require('@strapi/plugin-users-permissions/server/utils');

module.exports = ({ strapi }) => {
  /**
   * Helper to get profiles
   *
   * @param {String}   provider
   */

  const getProfile = async (provider, query) => {
    console.log(query);

    const access_token = query.access_token || query.code || query.oauth_token;

    const providers = await strapi
      .store({ type: 'plugin', name: 'users-permissions', key: 'grant' })
      .get();

    // get 'providers-registry' (overwritten) and use 'run' w/ chosen provider. 
    let user = await getService('providers-registry').run({
      provider,
      query,
      access_token,
      providers,
    });

    console.log(user);

    return user;
  };

  /**
   * Connect thanks to a third-party provider.
   *
   *
   * @param {String}    provider
   * @param {String}    access_token
   *
   * @return  {*}
   */

  const connect = async (provider, query) => {
    const access_token = query.access_token || query.code || query.oauth_token;
    
    if (!access_token) {
      throw new Error('No access_token.');
    }

    // Get the profile.
    const profile = await getProfile(provider, query);

    // User Profile
    const profile_user = profile[0];
    const providerId = profile_user.userId;
    const email = _.toLower(profile_user.email);

    // Email and the ID from the Provider are required.
    if (!email) {
      throw new Error('Email was not available.');
    }

    if (!providerId) {
      throw new Error('User could not be found');
    }

    const users = await strapi.query('plugin::users-permissions.user').findMany({
      // using local, no providers
      // where: { email }

      // using provider (discord)
      where: { providerId },
    });

    const advancedSettings = await strapi
      .store({ type: 'plugin', name: 'users-permissions', key: 'advanced' })
      .get();

    const user = _.find(users, { provider });

    if (!_.isEmpty(user)) {
      return user;
    }

    if (_.isEmpty(user) && !advancedSettings.allow_register) {
      throw new Error('Register action is actually not available.');
    }

    if (users.length > 1 && advancedSettings.unique_email) {
      throw new Error('Email is already taken.');
    }

    // Retrieve default role.
    const defaultRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: advancedSettings.default_role } });

    // Create the new user.
    const newUser = {
      ...profile_user,
      email, // overwrite with lowercased email
      provider,
      role: defaultRole.id,
      confirmed: true,
      avatar: profile_user.avatar,
      providerId: profile_user.userId
    };

    const createdUser = await strapi
      .query('plugin::users-permissions.user')
      .create({ data: newUser });

    return createdUser;
  };

  const buildRedirectUri = (provider = '') => {
    const apiPrefix = strapi.config.get('api.rest.prefix');

    console.log("Reached:", provider);

    return urlJoin(getAbsoluteServerUrl(strapi.config), apiPrefix, 'connect', provider, 'callback');
  };

  return {
    connect,
    buildRedirectUri,
  };
};
