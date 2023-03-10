import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

// Définition du modèle Photo qui étend la classe Model de Sequelize
export class Photo extends Model {}

// Initialisation du modèle Photo avec les attributs de la table correspondante
Photo.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    underscored: true, // Utilise la notation underscored pour les noms des champs
    tableName: 'photo', // Nom de la table correspondante dans la base de données
    sequelize, // Instance de Sequelize
    modelName: 'Photo', // Nom du modèle
    createdAt: false, // Désactive la gestion automatique du champ createdAt
    updatedAt: false, // Désactive la gestion automatique du champ updatedAt
  },
);
