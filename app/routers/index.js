import express from 'express';

export const router = express.Router();

import { authRouter } from './authRouter.js';
import { mainRouter } from './mainRouter.js';

router.use('/api/auth', authRouter);
router.use('/api', mainRouter);
