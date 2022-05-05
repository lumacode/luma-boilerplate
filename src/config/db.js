import { env } from './env';

export const knex = require('knex')({
    client: env.database.dbClient,
    connection: {
      host : env.database.dbHost,
      user : env.database.dbUser,
      password : env.database.dbPassword,
      database : env.database.dbName
    }
  });
