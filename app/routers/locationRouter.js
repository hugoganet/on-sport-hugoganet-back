// On importe le module "express" et on crée un objet routeur
import express from 'express';
const locationRouter = express.Router();

// On importe le contrôleur pour les routes d'emplacement
import { locationController } from '../controllers/locationController.js';

// On définit les routes de ce routeur en associant les fonctions du contrôleur aux méthodes HTTP correspondantes
locationRouter.get('/getall', locationController.getAllLocations); // Récupère tous les emplacements
locationRouter.get('/name/:search', locationController.getLocationByName); // Récupère un emplacement en fonction d'un nom de recherche
locationRouter.get('/', locationController.queryLocationByName); // Recherche un emplacement en fonction d'un nom
locationRouter.get('/id/:id', locationController.getLocationByID); // Récupère un emplacement en fonction d'un identifiant
locationRouter.get('/postcode/:id', locationController.getLocationByPostCode); // Récupère un emplacement en fonction d'un code postal

// On exporte l'objet routeur pour qu'il puisse être utilisé par l'application
export { locationRouter };
