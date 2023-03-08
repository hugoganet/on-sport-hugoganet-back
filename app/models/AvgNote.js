import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

export class AvgNote extends Model {}

AvgNote.init(
  {
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity_note: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'avg_note',
    sequelize,
    modelName: 'AvgNote',
    createdAt: false,
    updatedAt: false,
  },
);
