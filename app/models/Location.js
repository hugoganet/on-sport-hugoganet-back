// Import des modules nécessaires
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

// Définition de la classe Location, étendue à Model de Sequelize
export class Location extends Model {}

// Initialisation de la classe Location avec les champs de la table location
Location.init(
  {
    // L'identifiant de l'emplacement, clé primaire
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // Le nom de l'emplacement
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Le code postal de l'emplacement
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Le département de l'emplacement
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Activation de l'underscored pour les noms des champs de la table en snake_case
    underscored: true,
    // Nom de la table correspondante dans la base de données
    tableName: 'location',
    // Instance de Sequelize
    sequelize,
    // Nom du modèle dans Sequelize
    modelName: 'Location',
    // Pas besoin de gérer les champs created_at et updated_at
    createdAt: false,
    updatedAt: false,
  },
);

// Association entre Location et User
// Location.hasMany(User);
