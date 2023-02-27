import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

export class User_has_Sport extends Model {}

User_has_Sport.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sport_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'user_has_sport',
    sequelize,
    modelName: 'User_has_Sport',
    createdAt: false,
    updatedAt: false,
  },
);
