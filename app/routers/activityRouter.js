import express from 'express';
const activityRouter = express.Router();

import { activityController } from '../controllers/activityController.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';

activityRouter.get(
  '/sport/:name',
  controlSyntaxMiddleware.syntaxTypeControl,
  activityController.getActivitiesBySport,
);
activityRouter.get('/', activityController.getAllActivities);

export { activityRouter };
