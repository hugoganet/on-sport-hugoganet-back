import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

export class Sport extends Model {}

Sport.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    underscored: true,
    tableName: 'sport',
    sequelize,
    modelName: 'Sport',
    createdAt: false,
    updatedAt: false,
  },
);
