import express from 'express';
const userRouter = express.Router();

import { userController } from '../controllers/userController.js';
import { uploadFile } from '../middlewares/uploadPhoto.js';

userRouter
  .route('/profil/:id')
  .get(userController.getProfil)
  .put(uploadFile, userController.modifyProfil);

userRouter.route('/profil/:id/photo/:name').get(userController.getPhoto);
export { userRouter };
