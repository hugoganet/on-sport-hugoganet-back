import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';

export const controlUnique = {
  async uniqueUser(req, res, next) {
    const { login, password } = req.body;

    if (login === undefined || password === undefined) {
      return res.status(400).json({ Error: 'Formulaire non complet' });
    }

    const dataToControl = await User.findOne({ where: { login: login } });

    if (dataToControl?.dataValues) {
      return res.status(400).json({ Error: 'Utilisateur existe déjà' });
    }
    next();
  },
  async uniqueActivity(req, res, next) {
    const { title, sport_id, user_id } = req.body;

    if (
      title === undefined ||
      sport_id === undefined ||
      user_id === undefined
    ) {
      return res.status(400).json({ Error: 'Formulaire non complet' });
    }

    const dataToControl = await Activity.findOne({ where: { title: title } });

    if (dataToControl?.dataValues) {
      return res.status(400).json({ Error: "Nom d'activité déjà existant" });
    }
    next();
  },
};
