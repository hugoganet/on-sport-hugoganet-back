import express from 'express';
const activityRouter = express.Router();

import { activityController } from '../controllers/activityController.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';

activityRouter.get('/', activityController.getAllActivities);
activityRouter.post('/', activityController.createActivity);
activityRouter.put('/:id', activityController.updateActivityByID);
activityRouter.delete('/:id', activityController.deleteActivityByID);

activityRouter.get(
  '/sport/:name',
  controlSyntaxMiddleware.syntaxTypeControl,
  activityController.getActivitiesBySport,
);

export { activityRouter };
