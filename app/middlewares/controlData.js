import { User } from '../models/User.js';

export const controlUnique = {
  async uniqueUser(req, res, next) {
    const { login, password } = req.body;

    if (login === undefined || password === undefined) {
      return res.status(400).json({ Error: 'Formulaire non complet' });
    }

    const dataToControl = await User.findOne({ where: { login: login } });
    console.log('DATA', dataToControl);
    if (dataToControl.dataValues) {
      return res.status(400).json({ Error: 'Utilisateur existe déjà' });
    }
    next();
  },
};
