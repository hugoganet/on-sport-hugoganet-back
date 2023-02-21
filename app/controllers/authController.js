import { User } from '../models/User.js';

export const authController = {
  async signup(req, res) {
    try {
      const test = await User.findAll();

      console.log(test);
      res.status(200).json(test);
    } catch (err) {
      console.log(err);
    }
  },
};
