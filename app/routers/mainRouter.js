import express from 'express';
export const mainRouter = express.Router();

import { mainController } from '../controllers/mainController.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';

mainRouter.get(
  '/activity/sport/:name',
  controlSyntaxMiddleware.syntaxTypeControl,
  mainController.getActivitiesBySport,
);
mainRouter.get('/activity', mainController.getAllActivities);
