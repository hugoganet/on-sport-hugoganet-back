import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { Sport } from '../models/Sport.js';

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
      // activities.dataValues.sportName = activities.dataValues.Sport.name;
      user.dataValues.activitiesList = activities;
      res.json(user);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
};

export { userController };
