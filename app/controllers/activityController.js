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
  async createActivity(req, res) {
    const json = JSON.parse(req.body.json);
    console.log('JE SUIS LAAAA', req.file);
    json.photo = req.file.filename;
    try {
      await Activity.create({
        title: json.title,
        note: json.note,
        description: json.description,
        family_tag: json.family_tag,
        sport_id: json.sport_id,
        user_id: json.user_id,
        location_id: json.location_id,
      });
      res.status(201).json({
        message: 'Activity successful created',
        activity: json,
      });
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
  async updateActivityByID(req, res) {
    try {
      await Activity.findAll({ where: { id: req.params.id } }).then(
        async (result) => {
          if (result.length > 0) {
            await Activity.update(
              {
                title: req.body.title,
                note: req.body.note,
                description: req.body.description,
                family_tag: req.body.family_tag,
                sport_id: req.body.sport_id,
                user_id: req.body.user_id,
                location_id: req.body.location_id,
              },
              { where: { id: req.params.id } },
            );
            res.status(200).json({
              message: 'update successful',
            });
          } else {
            res.status(500).json({ message: 'update failed' });
          }
        },
      );
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
  async deleteActivityByID(req, res) {
    try {
      await Activity.findAll({ where: { id: req.params.id } }).then(
        async (result) => {
          if (result.length > 0) {
            await Activity.destroy({ where: { id: req.params.id } }),
              res.status(200).json({ message: 'delete activity successfully' });
          } else {
            res.status(404).json({ message: 'id activity not found' });
          }
        },
      );
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
};

export { activityController };
