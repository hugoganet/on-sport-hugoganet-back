import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { unlink } from 'node:fs';
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
  // async uniqueActivity(req, res, next) {
  //   console.log(req.body);
  //   const { title, sport_id, user_id } = req.body;

  //   if (
  //     title === undefined ||
  //     sport_id === undefined ||
  //     user_id === undefined
  //   ) {
  //     return res.status(400).json({ Error: 'Formulaire non complet' });
  //   }

  //   const dataToControl = await Activity.findOne({
  //     where: { title: title },
  //   });
  //   console.log(dataToControl);
  //   if (dataToControl?.dataValues) {
  //     return res.status(400).json({ Error: "Nom d'activité déjà existant" });
  //   }
  //   next();
  // },
  // TEST
  async uniqueActivity(req, res, next) {
    console.log('ICI', req.file, req.body.json);
    const json = JSON.parse(req.body.json);
    console.log(json);
    if (
      json.title === undefined ||
      json.sport_id === undefined ||
      json.user_id === undefined
    ) {
      unlink(`app/photos/${req.file.filename}`, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
      return res.status(400).json({ Error: 'Formulaire non complet' });
    }

    const dataToControl = await Activity.findOne({
      where: { title: json.title },
    });
    console.log(dataToControl);
    if (dataToControl?.dataValues) {
      unlink(`app/photos/${req.file.filename}`, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
      return res.status(400).json({ Error: "Nom d'activité déjà existant" });
    }
    console.log('JE PASSE ICI');
    next();
  },
};
