// Ce code définit une instance Sequelize pour se connecter à une base de données PostgreSQL.
// Les informations de connexion sont stockées dans des variables d'environnement en utilisant dotenv.
import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
  `${process.env.PGDATABASE}`,
  `${process.env.PGUSER}`,
  `${process.env.PGPASSWORD}`,
  {
    host: `${process.env.PGHOST}`,
    dialect: 'postgres',
  },
);
