import express from 'express';
const activityRouter = express.Router();

import { activityController } from '../controllers/activityController.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';
import { controlUnique } from '../middlewares/controlData.js';

activityRouter
  .route('/')
  .get(activityController.getAllActivities)
  .post(controlUnique.uniqueActivity, activityController.createActivity);

activityRouter
  .route('/:id')
  .get(activityController.getActivityByID)
  .put(activityController.updateActivityByID)
  .delete(activityController.deleteActivityByID);

activityRouter
  .route('/sport/:name')
  .get(
    controlSyntaxMiddleware.syntaxTypeControl,
    activityController.getActivitiesBySport,
  );

export { activityRouter };
