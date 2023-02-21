import express from 'express';
export const authRouter = express.Router();

import { authController } from '../controllers/authController.js';

authRouter.use('/signup', authController.signup);
