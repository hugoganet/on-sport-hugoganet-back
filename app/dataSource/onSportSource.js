// Ce code définit une instance Sequelize pour se connecter à une base de données PostgreSQL.
// Les informations de connexion sont stockées dans des variables d'environnement en utilisant dotenv.
import { Sequelize } from 'sequelize';
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL;

export const sequelize = new Sequelize(databaseURL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});
