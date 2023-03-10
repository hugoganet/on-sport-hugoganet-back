import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

export class Comment extends Model {}

// Définition des champs de la table "Comment"
Comment.init(
  {
    content: {
      type: DataTypes.STRING, // Type de données : chaîne de caractères
      allowNull: true, // La valeur peut être nulle
    },
    activity_note: {
      type: DataTypes.INTEGER, // Type de données : entier
      allowNull: true, // La valeur peut être nulle
    },
    user_id: {
      type: DataTypes.INTEGER, // Type de données : entier
      allowNull: false, // La valeur ne peut pas être nulle
    },
    activity_id: {
      type: DataTypes.INTEGER, // Type de données : entier
      allowNull: false, // La valeur ne peut pas être nulle
    },
  },
  {
    underscored: true, // Utilisation de la convention de nommage snake_case
    tableName: 'comment', // Nom de la table dans la base de données
    sequelize, // Connexion à la base de données
    modelName: 'Comment', // Nom du modèle
    createdAt: false, // Pas de champ "created_at"
    updatedAt: false, // Pas de champ "updated_at"
  },
);
