import express from 'express';
const userRouter = express.Router();

import { userController } from '../controllers/userController.js';
import { uploadFile } from '../middlewares/uploadPhoto.js';
import { controlUnique } from '../middlewares/controlData.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';
userRouter
  .route('/profil/:id')
  .get(controlSyntaxMiddleware.syntaxIdControl, userController.getProfil)
  .patch(
    controlSyntaxMiddleware.syntaxIdControl,
    uploadFile,
    controlUnique.uniqueProfil,
    userController.modifyProfil,
  );

userRouter
  .route('/profil/:id/photo/:name')
  .get(controlSyntaxMiddleware.syntaxTypeControl, userController.getPhoto);
export { userRouter };
