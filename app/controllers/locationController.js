import { Location } from '../models/Location.js';

const locationController = {
  async getAllLocations(req, res) {
    try {
      const locations = await Location.findAll();
      res.json(locations);
    } catch (err) {
      console.log(err);
    }
  },
  async getLocationByID(req, res) {
    const locationRequest = req.params.id;
    try {
      const location = await Location.findOne({
        where: { id: locationRequest },
      });
      res.json(location);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
  async getLocationByPostCode(req, res) {
    const locationRequest = req.params.id;
    try {
      const location = await Location.findAll({
        where: { postcode: locationRequest },
      });
      res.json(location);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
};

export { locationController };
