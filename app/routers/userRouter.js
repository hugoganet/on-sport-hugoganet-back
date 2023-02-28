import express from 'express';
const userRouter = express.Router();

import { userController } from '../controllers/userController.js';

userRouter
  .route('/profil/:id')
  .get(userController.getProfil)
  .put(userController.modifyProfil);

export { userRouter };
