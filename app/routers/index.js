import express from 'express';

const router = express.Router();

import { authRouter } from './authRouter.js';
import { activityRouter } from './activityRouter.js';
import { commentRouter } from './commentRouter.js';
import { mainRouter } from './mainRouter.js';
//import { controlToken } from '../middlewares/jwt.js';

router.use('/api/auth', authRouter);
//router.use(controlToken.validateToken);
router.use('/api/activity', activityRouter);
router.use('/api/comment', commentRouter);
router.use('/api', mainRouter);
router.use('/', mainRouter);

export { router };
