import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../dataSource/onSportSource.js';
import { Sport } from './Sport.js';

export class Activity extends Model {}

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
  {
    underscored: true,
    tableName: 'activity',
    sequelize,
    modelName: 'Activity',
    createdAt: false,
    updatedAt: false,
  },
);

Activity.belongsTo(Sport, { foreignKey: 'id' });
