import express from 'express';
const activityRouter = express.Router();

import { activityController } from '../controllers/activityController.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';
import { controlUnique } from '../middlewares/controlData.js';
import { uploadFile } from '../middlewares/uploadPhoto.js';

activityRouter.route('/').get(activityController.getAllActivities).post(
  uploadFile,
  // controlUnique.uniqueActivity,
  activityController.createActivity,
);

activityRouter
  .route('/:id')
  .get(activityController.getActivityByID)
  .put(activityController.updateActivityByID)
  .delete(activityController.deleteActivityByID);

activityRouter.get('/:id/photo/:name', activityController.getPhoto);

activityRouter
  .route('/sport/:name')
  .get(
    controlSyntaxMiddleware.syntaxTypeControl,
    activityController.getActivitiesBySport,
  );

export { activityRouter };
