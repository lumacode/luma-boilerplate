const database = require('./database/config');

// Update with your config settings.
module.exports = {
    development: {
        client: database.dbClient,
        connection: {
          host : database.dbHost,
          user : database.dbUser,
          password : database.dbPassword,
          database : database.dbName
        },
        migrations: {
            directory: __dirname + '/database/migrations',
          },
        seeds: {
            directory: __dirname + '/database/seeds',
          },
      },
    production: {
        client: database.dbClient,
        connection: {
          host : database.dbHost,
          user : database.dbUser,
          password : database.dbPassword,
          database : database.dbName
        },
        migrations: {
            directory: __dirname + '/database/migrations',
          },
        seeds: {
            directory: __dirname + '/database/seeds',
          },
      },
  };

