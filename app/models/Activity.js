// Importation des modules nécessaires
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';
import { Sport } from './Sport.js';
import { Location } from './Location.js';
import { User } from './User.js';

// Création de la classe Activity qui étend la classe Model de Sequelize
export class Activity extends Model {}

// Initialisation de la structure de la table Activity avec les types de données et les contraintes
Activity.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    family_tag: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sport_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  // Options de configuration de la table
  {
    underscored: true,
    tableName: 'activity', // Nom de la table dans la base de données
    sequelize, // Instance de Sequelize pour la connexion à la base de données
    modelName: 'Activity', // Nom de la classe modèle
    createdAt: false, // Désactive la création de la colonne createdAt dans la table
    updatedAt: false, // Désactive la création de la colonne updatedAt dans la table
  },
);

// Association entre les tables Activity, Sport, Location et User avec les clés étrangères
Activity.belongsTo(Sport, { foreignKey: 'sport_id' });
Activity.belongsTo(Location, { foreignKey: 'location_id' });
Activity.belongsTo(User, { foreignKey: 'user_id' });
