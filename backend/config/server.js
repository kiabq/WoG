const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'https://squid-app-sywr8.ondigitalocean.app'),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET")
    }
  },
  proxy: true,
  app: {
    keys: env.array("APP_KEYS"),
  },
  cron: {
    enabled: true,
    tasks: cronTasks
  }
});