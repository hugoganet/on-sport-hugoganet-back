import express from 'express';
const locationRouter = express.Router();

import { locationController } from '../controllers/locationController.js';

locationRouter.get('/getall', locationController.getAllLocations);
locationRouter.get('/name/:search', locationController.getLocationByName);
locationRouter.get('/', locationController.queryLocationByName);
locationRouter.get('/id/:id', locationController.getLocationByID);
locationRouter.get('/postcode/:id', locationController.getLocationByPostCode);

export { locationRouter };
