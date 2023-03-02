import { Activity } from '../models/Activity.js';
import { Sport } from '../models/Sport.js';
import { Location } from '../models/Location.js';
import { User } from '../models/User.js';
import { sequelize } from '../dataSource/onSportSource.js';

import { Photo } from '../models/Photo.js';

const activityController = {
  /**
   * Récupérer la liste complète des activités.
   * @param {*} _req Non requis
   * @param {*} res
   */
  async getAllActivities(_req, res) {
    try {
      const activities = await Activity.findAll({
        include: [
          { model: Sport },
          { model: User, attributes: ['firstname'] },
          { model: Location, attributes: ['name', 'postcode', 'department'] },
        ],
        attributes: [
          'id',
          'title',
          'note',
          'description',
          'family_tag',
          'photo',
          'user_id',
          'sport_id',
          'location_id',
        ],
      });
      const activitiesList = activities.map((activity) => {
        return {
          id: activity.id,
          title: activity.title,
          note: activity.note,
          description: activity.description,
          family_tag: activity.family_tag,
          photo: activity.photo,
          user_id: activity.user_id,
          user_firstname: activity.User ? activity.User.firstname : null,
          sportID: activity.sport_id,
          sportName: activity.Sport ? activity.Sport.name : null,
          location_id: activity.location_id,
          locationName: activity.Location ? activity.Location.name : null,
          locationPostcode: activity.Location
            ? activity.Location.postcode
            : null,
          locationDepartment: activity.Location
            ? activity.Location.department
            : null,
        };
      });
      res.status(200).json(activitiesList);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getActivityByID(req, res) {
    const activityRequest = req.params.id;
    console.log(activityRequest);
    try {
      const activity = await Activity.findOne({
        where: { id: activityRequest },
        include: [
          { model: Sport },
          { model: Location },
          { model: User, attributes: ['firstname'] },
        ],
      });
      const activityDetail = {
        id: activity.id,
        title: activity.title,
        note: activity.note,
        description: activity.description,
        family_tag: activity.family_tag,
        photo: activity.photo,
        user_id: activity.user_id,
        user_firstname: activity.User ? activity.User.firstname : null,
        sportID: activity.Sport.id,
        sportName: activity.Sport.name,
        location_id: activity.Location?.id,
        locationName: activity.Location?.name,
        locationPostcode: activity.Location?.postcode,
        locationDepartment: activity.Location?.department,
      };
      activity.dataValues.activityDetail = activityDetail;
      res.status(200).json(activityDetail);
    } catch (err) {
      res.status(404).json({ message: 'Activity not found' });
    }
  },
  /**
   * Récupération de la liste des activités par sport.
   * @param {*} req
   * @param {*} res
   */
  async getActivitiesBySport(req, res) {
    const sportRequest = req.params.name.toLowerCase();
    // const idSport = await Sport.findOne({ where: { name: sportRequest } });
    try {
      const activities = await Activity.findAll({
        include: [{ model: Sport }, { model: Location }],
        where: { '$Sport.name$': sportRequest },
      });
      const activitiesDetails = activities.map((activity) => {
        return {
          id: activity.id,
          title: activity.title,
          note: activity.note,
          description: activity.description,
          family_tag: activity.family_tag,
          photo: activity.photo,
          sportID: activity.Sport.id,
          sportName: activity.Sport.name,
          location_id: activity.Location.id,
          locationName: activity.Location.name,
          locationPostcode: activity.Location.postcode,
          locationDepartment: activity.Location.department,
        };
      });
      res.json(activitiesDetails);
    } catch (err) {
      res.status(404).json({ message: 'Activities not found' });
    }
  },
  async createActivity(req, res) {
    console.log('ICI :');
    const jsonAsString = JSON.parse(req.body.jsonAsString);

    try {
      await Activity.create({
        title: jsonAsString.title,
        note: jsonAsString.note,
        description: jsonAsString.description,
        family_tag: jsonAsString.family_tag,
        sport_id: jsonAsString.sport_id,
        user_id: jsonAsString.user_id,
        location_id: jsonAsString.location_id,
      });
      const result = await Activity.findOne({
        where: { title: jsonAsString.title },
      });
      if (req?.file) {
        result.dataValues.photo = req.file?.filename;
        // Upload photo process
        await Photo.create({
          name: req.file.filename,
          activity_id: result.dataValues.id,
        });
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
