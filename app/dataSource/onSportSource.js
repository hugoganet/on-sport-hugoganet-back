import { Sequelize } from 'sequelize';
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL;

export const sequelize = new Sequelize(databaseURL, {
  dialect: 'postgres',
  dialectOptions: {
    // The ssl configuration in dialectOptions is set to require SSL connections and allow unauthorized certificates, which is necessary when connecting to a Heroku Postgres database.
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
