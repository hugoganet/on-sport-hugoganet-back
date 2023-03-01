import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

export class Photo extends Model {}

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
    underscored: true,
    tableName: 'photo',
    sequelize,
    modelName: 'Photo',
    createdAt: false,
    updatedAt: false,
  },
);
