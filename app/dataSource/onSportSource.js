import { Sequelize } from 'sequelize';
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL;

export const sequelize = new Sequelize(databaseURL, {
  ddialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});
