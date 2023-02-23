import { Activity } from '../models/Activity.js';
import { Sport } from '../models/Sport.js';

const activityController = {
  /**
   * Récupérer la liste complète des activités.
   * @param {*} _req Non requis
   * @param {*} res
   */
  async getAllActivities(_req, res) {
    try {
      const activity = await Activity.findAll({ include: { model: Sport } });
      activity.length > 0 && res.status(200).json(activity);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getActivityByID(req, res) {
    const activityRequest = req.params.id;
    try {
      const activity = await Activity.findOne({
        where: { id: activityRequest },
      });
      res.json(activity);
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * Récupération de la liste des activités par sport.
   * @param {*} req
   * @param {*} res
   */
  async getActivitiesBySport(req, res) {
    const sportRequest = req.params.name.toLowerCase();
    const idSport = await Sport.findOne({ where: { name: sportRequest } });
    try {
      const listActivities = await Activity.findAll({
        where: { sport_id: idSport.id },
      });
      res.json(listActivities);
    } catch (err) {
      console.log(err);
    }
  },
};

export { activityController };
