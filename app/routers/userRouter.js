import express from 'express';
const userRouter = express.Router();

import { userController } from '../controllers/userController.js';
import { uploadFile } from '../middlewares/uploadPhoto.js';
import { controlUnique } from '../middlewares/controlData.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';

// Routes relatives aux profils utilisateur
userRouter
  .route('/profil/:id')
  .get(controlSyntaxMiddleware.syntaxIdControl, userController.getProfil) // Route pour obtenir un profil d'utilisateur
  .patch(
    // Route pour modifier un profil d'utilisateur
    controlSyntaxMiddleware.syntaxIdControl, // Vérification de la syntaxe de l'ID utilisateur
    uploadFile, // Middleware pour gérer l'upload d'une photo de profil
    controlUnique.uniqueProfil, // Vérification de l'unicité des informations de profil
    userController.modifyProfil, // Contrôleur pour la modification du profil
  )
  .delete(controlSyntaxMiddleware.syntaxIdControl, userController.deleteProfil); // Route pour supprimer un profil d'utilisateur

userRouter.route('/profil/:id/photo/:name').get(userController.getPhoto); // Route pour obtenir la photo de profil d'un utilisateur

export { userRouter };
