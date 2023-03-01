import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { Sport } from '../models/Sport.js';
import { Photo } from '../models/Photo.js';
import { sequelize } from '../dataSource/onSportSource.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const userController = {
  async getProfil(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      const activities = await Activity.findAll({
        where: { user_id: userId },
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
      const userPhotoProfil = await Photo.findOne({
        where: { user_id: userId },
      });
      user.dataValues.activitiesList = activitiesList;
      delete user.password;
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
  async modifyProfil(req, res) {
    const jsonAsString = JSON.parse(req.body.jsonAsString);

    const userId = req.params.id;
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

    const hashPassword = await bcrypt.hash(jsonAsString.password, saltRounds);

    try {
      const newProfil = await sequelize.query(
        `UPDATE "user" SET
              firstname = '${jsonAsString.firstname}',
              lastname = '${jsonAsString.lastname}',
              email = '${jsonAsString.email}',
              login = '${jsonAsString.login}',
              age = '${jsonAsString.age}',
              bio = '${jsonAsString.bio}',
              location_id = ${jsonAsString.location_id},
              password = '${hashPassword}'
          WHERE id=${userId}
          RETURNING id,firstname,lastname,email,login,age,bio,location_id,`,
      );
      // Upload photo process
      if (req.file) {
        await Photo.create({
          name: req.file.filename,
          user_id: userId,
        });
      }
      console.log(newProfil);
      res.status(200).json(newProfil);
    } catch (err) {
      console.log(err);
    }
  },
  async getPhoto(req, res) {
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

export { userController };
