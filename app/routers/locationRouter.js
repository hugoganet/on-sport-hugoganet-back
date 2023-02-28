import express from 'express';
const locationRouter = express.Router();

import { locationController } from '../controllers/locationController.js';

locationRouter.get('/', locationController.getAllLocations);
locationRouter.get('/:id', locationController.getLocationByID);
locationRouter.get('/postcode/:id', locationController.getLocationByPostCode);

export { locationRouter };
