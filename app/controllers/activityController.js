import { Activity } from '../models/Activity.js';
import { Sport } from '../models/Sport.js';
import { sequelize } from '../dataSource/onSportSource.js';
const activityController = {
  /**
   * Récupérer la liste complète des activités.
   * @param {*} _req Non requis
   * @param {*} res
   */
  async getAllActivities(_req, res) {
    try {
      const activity = await Activity.findAll({ include: { model: Sport } });
      const result = await sequelize.query(`
      SELECT 
          a.id,a.title,a.note,
          a.description,
          a.family_tag,
          a.photo,user_id,
          u.firstname as user_firstname,
          a.sport_id,
          s.name as sport_name,
          a.location_id
      FROM activity a
      JOIN "user" u
      ON a.user_id = u.id
      JOIN sport s
      ON a.sport_id = s.id
      JOIN location l
      ON l.id = a.location_id;`);
      activity.length > 0 && res.status(200).json(result[0]);
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
    console.log('CONTROLLER', json);
    console.log(json.title);
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
      const result = await Activity.findOne({ where: { title: json.title } });
      if (req.file) {
        result.dataValues.photo = req.file.filename;
      }
      res.status(201).json({
        message: 'Activity successful created',
        activity: result,
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
  getPhoto(req, res) {
    const fileName = req.params.name;
    const directoryPath = 'app/photos/';

    res.download(directoryPath + fileName, fileName, (err) => {
      console.log('DOWNLOAD');

      if (err) {
        res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }
    });
  },
};

export { activityController };
