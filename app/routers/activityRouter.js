import express from 'express';
const activityRouter = express.Router();

import { activityController } from '../controllers/activityController.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';
import { controlUnique } from '../middlewares/controlData.js';

activityRouter.get('/', activityController.getAllActivities);
activityRouter.get('/:id', activityController.getActivityByID);
activityRouter.post(
  '/',
  controlUnique.uniqueActivity,
  activityController.createActivity,
);
activityRouter.put('/:id', activityController.updateActivityByID);
activityRouter.delete('/:id', activityController.deleteActivityByID);

activityRouter.get(
  '/sport/:name',
  controlSyntaxMiddleware.syntaxTypeControl,
  activityController.getActivitiesBySport,
);

export { activityRouter };
