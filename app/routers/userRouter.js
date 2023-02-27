import express from 'express';
const userRouter = express.Router();

import { userController } from '../controllers/userController.js';

userRouter.get('/profil/:id', userController.getProfil);

export { userRouter };
