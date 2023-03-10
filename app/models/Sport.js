import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

export class Sport extends Model {}

// Définition de la classe Sport qui étend la classe Model
// pour interagir avec la table "sport" dans la base de données
Sport.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    underscored: true, // Utilise des noms de colonne en minuscules avec des underscores
    tableName: 'sport', // Nom de la table dans la base de données
    sequelize, // Objet sequelize lié à la définition de la table
    modelName: 'Sport', // Nom de la classe Model associée à la table
    createdAt: false, // Pas de colonne de date de création
    updatedAt: false, // Pas de colonne de date de mise à jour
  },
);

// La classe Sport sera utilisée pour interagir avec les enregistrements de la table "sport" dans la base de données en utilisant l'objet sequelize.
