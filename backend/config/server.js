const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  // host: env('HOST', '0.0.0.0'),
  // port: env.int('PORT', 1337),
  host: env('APP_HOST', '0.0.0.0'),
  port: env.int('NODE_PORT', 1337),
  url: env('', 'https://starfish-app-cxov4.ondigitalocean.app'),
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