import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { Sport } from '../models/Sport.js';
import { where } from 'sequelize';
import { sequelize } from '../dataSource/onSportSource.js';

const userController = {
  async getProfil(req, res) {
    const userRequest = req.params.id;
    try {
      const user = await User.findOne({
        where: { id: userRequest },
      });
      const activities = await Activity.findAll({
        where: { user_id: userRequest },
        include: { model: Sport },
      });
      const activitiesList = activities.map((activity) => {
        return {
          id: activity.id,
          title: activity.title,
          note: activity.note,
          description: activity.description,
          family_tag: activity.family_tag,
          photo: activity.photo,
          sportID: activity.Sport.id,
          sportName: activity.Sport.name,
          location_id: activity.location_id,
        };
      });
      user.dataValues.activitiesList = activitiesList;
      res.json(user);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
  async modifyProfil(req, res) {
    const userRequest = req.params.id;
    const {
      firstname,
      lastname,
      login,
      email,
      age,
      bio,
      location_id,
      password,
    } = req.body;
    try {
      const newProfil = sequelize.query(
        `UPDATE "user" SET
              firstname = '${firstname}',
              lastname = '${lastname}',
              email = '${email}',
              login = '${login}',
              age = '${age}',
              bio = '${bio}',
              location_id = ${location_id},
              password = '${password}'
          WHERE id=${userRequest}`,
      );

      res.status(200).json(newProfil);
    } catch (err) {
      console.log(err);
    }
  },
};

export { userController };
