import express from 'express';

export const router = express.Router();

import { mainRouter } from './mainRouter.js';
import { authRouter } from './authRouter.js';

router.use('/api/auth', authRouter);
router.use('/api', mainRouter);
