// On importe le module "express" et on crée un objet routeur
import express from 'express';
const router = express.Router();

// On importe les sous-routeurs pour chaque entité de l'application
import { authRouter } from './authRouter.js';
import { controlToken } from '../middlewares/jwt.js';
import { userRouter } from './userRouter.js';
import { activityRouter } from './activityRouter.js';
import { commentRouter } from './commentRouter.js';
import { locationRouter } from './locationRouter.js';
import { mainRouter } from './mainRouter.js';

// On associe chaque sous-routeur à une URL de l'application
router.use('/api/auth', authRouter);
router.use('/api/location', locationRouter);
router.use('/api/activity', activityRouter);
router.use('/api/user', userRouter);
router.use(controlToken.validateToken);
router.use('/api/comment', commentRouter);
router.use('/api', mainRouter);
router.use('/', mainRouter);

// On exporte l'objet routeur pour qu'il puisse être utilisé par l'application
export { router };
