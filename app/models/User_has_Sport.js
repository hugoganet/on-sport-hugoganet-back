// Importation des classes Model et DataTypes à partir du module sequelize, ainsi que l'objet sequelize de '../dataSource/onSportSource.js'
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

// Création de la classe User_has_Sport qui étend la classe Model
export class User_has_Sport extends Model {}

// Utilisation de la méthode init pour définir la table "user_has_sport" dans la base de données
User_has_Sport.init(
  {
    // Définition de la colonne user_id qui est de type INTEGER et peut être nulle
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Définition de la colonne sport_id qui est de type INTEGER et ne peut pas être nulle
    sport_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Spécification d'options pour la définition de la table
    underscored: true, // Utilisation de noms de colonnes en minuscules avec des underscores plutôt qu'en PascalCase
    tableName: 'user_has_sport', // Nom de la table dans la base de données
    sequelize, // Lien vers l'objet sequelize pour cette définition de table
    modelName: 'User_has_Sport', // Nom de la classe Model pour cette définition de table
    createdAt: false, // Ne pas ajouter de colonne de date de création
    updatedAt: false, // Ne pas ajouter de colonne de date de mise à jour
  },
);
