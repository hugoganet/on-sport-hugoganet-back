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
      const activitiesList = await activities.map((activity) => {
        return {
          id: activity.id,
          title: activity.title,
          note: activity.note,
          description: activity.description,
          family_tag: activity.family_tag,
          photo: activity.photo,
          sportID: activity.Sport?.id,
          sportName: activity.Sport?.name,
          location_id: activity.location_id,
        };
      });

      const userPhotoProfil = await Photo.findOne({
        where: { user_id: userId },
      });
      if (userPhotoProfil) {
        user.dataValues.photo = userPhotoProfil.dataValues?.name;
      }

      user.dataValues.activitiesList = activitiesList;
      delete user.dataValues.password;
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },
  async modifyProfil(req, res) {
    const jsonAsString = JSON.parse(req.body.jsonAsString);

    const userId = req.params.id;
    let hashPassword;
    if (jsonAsString.password) {
      hashPassword = await bcrypt.hash(jsonAsString.password, saltRounds);
    }

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
          RETURNING id,firstname,lastname,email,login,age,bio,location_id`,
      );
      // Upload photo process
      if (req?.file) {
        await Photo.create({
          name: req.file?.filename,
          user_id: userId,
        });
      }

      res.status(200).json(newProfil[0][0]);
    } catch (err) {
      //console.log('START ', err.errors[0].message);
      res.status(400).json({ error: err.errors[0].message });
      // console.log(err);
    }
  },
  async getPhoto(req, res) {
    try {
      const fileName = req.params.name;
      const directoryPath = 'app/photos/';
      res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
          //console.log('Error downloading file:', err);
          res.status(500).json({ message: 'Could not download the file.' });
          return;
        }
        //console.log('File downloaded successfully.');
      });
    } catch (err) {
      //console.log('Error:', err);
      res.status(500).json({ message: 'An error occurred.' });
    }
  },
};

export { userController };
