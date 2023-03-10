// On importe le module "express" et on crée un objet routeur
import express from 'express';
const authRouter = express.Router();

// On importe le contrôleur et les middlewares pour les routes d'authentification
import { authController } from '../controllers/authController.js';
import { controlUnique } from '../middlewares/controlData.js';

// On définit les routes de ce routeur en associant les middlewares et les fonctions du contrôleur
authRouter.post('/signup', controlUnique.uniqueUser, authController.signup);
authRouter.post('/signin', controlUnique.loginNotEmpty, authController.signin);

// On exporte l'objet routeur pour qu'il puisse être utilisé par l'application
export { authRouter };
