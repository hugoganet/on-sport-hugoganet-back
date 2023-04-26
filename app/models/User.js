import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';
import { Location } from './Location.js';

// Définition de la classe User en étendant la classe Model de sequelize
export class User extends Model {}

// Initialisation de la classe User pour lier l'objet User à la table "user" dans la base de données
User.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // eslint-disable-next-line no-dupe-keys
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    underscored: true,
    tableName: 'user', // Nom de la table dans la base de données
    sequelize,
    modelName: 'User', // Nom de la classe modèle
    createdAt: false,
    updatedAt: false,
  },
);

// L'objet User a une relation "hasOne" avec la classe Location, utilisant la clé étrangère "location_id"
User.hasOne(Location, { foreignKey: 'id' });
