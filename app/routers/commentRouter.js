// On importe le module "express" et on crée un objet routeur
import express from 'express';
const commentRouter = express.Router();

// On importe le contrôleur pour les routes de commentaires
import { commentController } from '../controllers/commentController.js';

// On définit les routes de ce routeur en associant les fonctions du contrôleur aux méthodes HTTP correspondantes
commentRouter
  .route('/activity/:id')
  .get(commentController.getCommentsByActivity)
  .post(commentController.postComment)
  .delete(commentController.deletePostByID);

// On exporte l'objet routeur pour qu'il puisse être utilisé par l'application
export { commentRouter };
