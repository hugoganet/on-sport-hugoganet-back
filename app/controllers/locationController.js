import { Location } from '../models/Location.js';
import { Op } from 'sequelize';

const locationController = {
  async getAllLocations(req, res) {
    try {
      // Récupère toutes les localisations
      const locations = await Location.findAll();
      res.json(locations);
    } catch (err) {
      console.log(err);
    }
  },
  async getLocationByID(req, res) {
    const locationRequest = req.params.id;
    try {
      // Récupère une localisation par son ID
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
      // Récupère une localisation par son code postal
      const location = await Location.findAll({
        where: { postcode: locationRequest },
      });
      res.json(location);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
  async getLocationByName(req, res) {
    const search = req.params.search;
    try {
      // Récupère les localisations par le nom partiel
      const cities = await Location.findAll({
        where: {
          name: {
            [Op.iLike]: `${search}%`,
          },
        },
        limit: 10,
      });
      res.json(cities);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  async queryLocationByName(req, res) {
    const { search } = req.query;
    try {
      // Récupère les localisations par le nom partiel
      const cities = await Location.findAll({
        where: {
          name: {
            [Op.iLike]: `${search}%`,
          },
        },
        limit: 10,
      });
      res.json(cities);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};

export { locationController };
