import { User } from '../models/User.js'; //import de la classe User
import { Activity } from '../models/Activity.js'; //import de la classe Activity
import { Sport } from '../models/Sport.js'; //import de la classe Sport
import { Photo } from '../models/Photo.js'; //import de la classe Photo
import { Location } from '../models/Location.js'; //import de la classe Location
import { unlink } from 'node:fs'; //import de la méthode unlink du module fs de Node.js
import bcrypt from 'bcrypt'; //import du module bcrypt, qui permet de chiffrer les mots de passe
const saltRounds = 10; //nombre de tours de chiffrement pour bcrypt

const userController = {
  //méthode asynchrone pour récupérer le profil d'un utilisateur
  async getProfil(req, res) {
    const userId = req.params.id; //récupération de l'id de l'utilisateur depuis les paramètres de la requête
    try {
      const user = await User.findOne({
        //recherche de l'utilisateur correspondant à l'id dans la table Users
        where: { id: userId },
      });
      const location = await Location.findOne({
        //recherche de la localisation de l'utilisateur dans la table Locations
        where: { id: user.dataValues.location_id },
      });

      // récupération des activités de l'utilisateur dans la table Activities et jointure avec les tables Sports et Locations
      const activities = await Activity.findAll({
        where: { user_id: userId },
        include: [{ model: Sport }, { model: Location }],
      });

      // création d'une liste simplifiée des activités de l'utilisateur
      const activitiesList = await activities.map((activity) => {
        return {
          id: activity.id,
          title: activity.title,
          note: activity?.note,
          description: activity?.description,
          family_tag: activity?.family_tag,
          photo: activity?.photo,
          sportID: activity.Sport?.id,
          sportName: activity.Sport?.name,
          location_id: activity.Location?.id,
          locationName: activity.Location?.name,
          locationPostcode: activity.Location?.postcode,
          locationDepartment: activity.Location?.department,
        };
      });

      // récupération de la photo de profil de l'utilisateur depuis la table Photos et ajout à l'objet utilisateur
      const userPhotoProfil = await Photo.findOne({
        where: { user_id: userId },
      });
      console.log(userPhotoProfil);
      if (userPhotoProfil) {
        user.dataValues.photo = userPhotoProfil.dataValues?.name;
      }

      // ajout des informations de localisation et des activités à l'objet utilisateur
      user.dataValues.locationName = location?.name;
      user.dataValues.locationPostcode = location?.postcode;
      user.dataValues.locationDepartment = location?.department;
      user.dataValues.activitiesList = activitiesList;
      //
      const profilPhoto = await Photo.findAll({
        where: { user_id: userId },
        attributes: ['name'],
      });

      if (profilPhoto) {
        user.photos = profilPhoto;
      }
      //
      // suppression du mot de passe de l'objet utilisateur avant de le renvoyer
      delete user.dataValues.password;
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },

  // méthode asynchrone pour modifier le profil d'un utilisateur
  async modifyProfil(req, res) {
    let jsonAsString;
    if (req.body?.jsonAsString) {
      jsonAsString = JSON.parse(req.body.jsonAsString);
    }

    const userId = req.params.id;
    let hashPassword;
    if (jsonAsString?.password) {
      hashPassword = await bcrypt.hash(jsonAsString.password, saltRounds); //hachage du mot de passe avec bcrypt
      jsonAsString.password = hashPassword;
    }

    try {
      await User.update(
        jsonAsString, //mise à jour des informations de l'utilisateur

        { where: { id: userId } },
      );
      const updateInfoProfil = await User.findOne({ where: { id: userId } });
      let photos = {};

      if (req?.files) {
        // Récupération name photo en BDD

        // ajout du nom de la photo en BDD en lien avec le user_id
        for (let i = 0; i < req?.files.length; i++) {
          photos[i] = req.files[i].filename;
          await Photo.create({
            name: req.files[i].filename,
            user_id: userId,
          });
        }
      }
      delete updateInfoProfil.dataValues.password;
      res.status(200).json(updateInfoProfil);
    } catch (err) {
      res.status(400).json(err);
      // console.log(err);
    }
  },

  //méthode pour récupérer une photo depuis le serveur
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

  //méthode pour supprimer le profil d'un utilisateur
  async deleteProfil(req, res) {
    const userId = req.params.id;
    const anonimousIdentity = Math.round(Math.random() * 1e5);

    const anonimousUser = {
      firstname: `user_${anonimousIdentity}`,
      lastname: `user_${anonimousIdentity}`,
      login: `login${anonimousIdentity}`,
      age: null,
      bio: null,
      email: `emailUser_${anonimousIdentity}`,
      location_id: null,
    };

    try {
      const userPhotoProfil = await Photo.findOne({
        where: { user_id: userId },
        attributes: ['name'],
      });

      // suppression du fichier photo sur le serveur
      if (userPhotoProfil) {
        unlink(`app/photos/${userPhotoProfil?.name}`, (err) => {
          if (err) throw err;
          console.log(`app/photos/${userPhotoProfil?.name} was deleted`);
        });
        await Photo.destroy({ where: { user_id: userId } }); //suppression de la photo de la table Photos
      }
      // anonymisation de l'utilisateur dans la table Users
      await User.update(anonimousUser, { where: { id: userId } });
      res.status(200).json({ info: `User ${userId} rendu inactif` });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

export { userController };
