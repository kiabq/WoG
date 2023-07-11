// Start Prod DB Settings
const parse = require('pg-connection-string').parse;

const { host, port, database, user, password } = parse(
  process.env.DATABASE_URL
)
// End Prod DB Settings

module.exports = ({ env }) => ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: {
          rejectUnauthorized: false
        },
      },
      debug: false,
    },
  });