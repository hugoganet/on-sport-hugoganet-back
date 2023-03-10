// Importation du module Express et création du router
import express from 'express';
const activityRouter = express.Router();

// Importation des contrôleurs et middlewares nécessaires
import { activityController } from '../controllers/activityController.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';
import { controlUnique } from '../middlewares/controlData.js';
import { uploadFile } from '../middlewares/uploadPhoto.js';

// Route pour la gestion des activités
activityRouter
  .route('/')
  // Gestion des requêtes GET pour récupérer toutes les activités
  .get(activityController.getAllActivities)
  // Gestion des requêtes POST pour créer une nouvelle activité
  .post(
    uploadFile,
    controlUnique.uniqueActivity,
    activityController.createActivity,
  );

// Route pour la gestion d'une activité en particulier
activityRouter
  .route('/:id')
  // Gestion des requêtes GET pour récupérer une activité par ID
  .get(activityController.getActivityByID)
  // Gestion des requêtes PUT pour mettre à jour une activité par ID
  .put(activityController.updateActivityByID)
  // Gestion des requêtes DELETE pour supprimer une activité par ID
  .delete(activityController.deleteActivityByID);

// Route pour récupérer la photo d'une activité par ID
activityRouter.get('/:id/photo/:name', activityController.getPhoto);

// Route pour récupérer toutes les activités d'un sport donné par nom
activityRouter
  .route('/sport/:name')
  // Middleware pour vérifier la validité de la syntaxe du nom du sport
  .get(
    controlSyntaxMiddleware.syntaxTypeControl,
    activityController.getActivitiesBySport,
  );

// Exportation du router pour l'utiliser dans l'application
export { activityRouter };
