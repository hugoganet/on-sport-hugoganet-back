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
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    family_tag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
      allowNull: false,
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
