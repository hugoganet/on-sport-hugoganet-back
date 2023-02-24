import express from 'express';
const authRouter = express.Router();

import { authController } from '../controllers/authController.js';
import { controlUnique } from '../middlewares/controlData.js';

authRouter.post('/signup', controlUnique.uniqueUser, authController.signup);
authRouter.post('/signin', authController.signin);

export { authRouter };
