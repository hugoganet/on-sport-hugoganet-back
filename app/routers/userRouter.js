import express from 'express';
const userRouter = express.Router();

import { userController } from '../controllers/userController.js';
import { uploadFile } from '../middlewares/uploadPhoto.js';
import { controlUnique } from '../middlewares/controlData.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';
import { controlToken } from '../middlewares/jwt.js';

userRouter.get('/profil/:id/photo/:name', userController.getPhoto);

userRouter.use(controlToken.validateToken);

userRouter
  .route('/profil/:id')
  .get(controlSyntaxMiddleware.syntaxIdControl, userController.getProfil)
  .patch(
    controlSyntaxMiddleware.syntaxIdControl,
    uploadFile,
    controlUnique.uniqueProfil,
    userController.modifyProfil,
  )
  .delete(controlSyntaxMiddleware.syntaxIdControl, userController.deleteProfil);

export { userRouter };
