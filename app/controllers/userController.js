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
      res.json(user);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
};

export { userController };
