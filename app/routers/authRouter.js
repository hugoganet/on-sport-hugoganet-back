import express from 'express';
export const authRouter = express.Router();

import { authController } from '../controllers/authController.js';

authRouter.post('/signup', authController.signup);

authRouter.post('/signin', authController.signin);
