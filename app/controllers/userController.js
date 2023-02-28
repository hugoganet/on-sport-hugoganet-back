import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { Sport } from '../models/Sport.js';

// const userController = {
//   async getProfil(req, res) {
//     const userRequest = req.params.id;
//     try {
//       const user = await User.findOne({
//         where: { id: userRequest },
//       });
//       const activities = await Activity.findAll({
//         where: { user_id: userRequest },
//         include: { model: Sport },
//       });
//       const activitiesWithSportName = activities.map((activity) => {
//         return {
//           ...activity.dataValues,
//           sportName: activity.Sport.name,
//         };
//       });
//       user.dataValues.activitiesList = activities;
//       res.json(user);
//     } catch (err) {
//       res.status(404).json({ message: err });
//     }
//   },
// };

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
};

export { userController };
