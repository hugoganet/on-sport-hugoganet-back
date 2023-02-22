import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

export class Photo extends Model {}

Photo.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
