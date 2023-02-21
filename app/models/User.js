import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

export class User extends Model {}

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
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'user',
    sequelize,
    modelName: 'User',
    createdAt: false,
    updatedAt: false,
  },
);
