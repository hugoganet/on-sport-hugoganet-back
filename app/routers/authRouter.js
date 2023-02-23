import express from 'express';
const authRouter = express.Router();

import { authController } from '../controllers/authController.js';

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);

export { authRouter };
