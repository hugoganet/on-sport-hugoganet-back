import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { unlink } from 'node:fs';
import { Photo } from '../models/Photo.js';

// Exportation d'un objet contenant une méthode asynchrone nommée "uniqueUser"
export const controlUnique = {
  async uniqueUser(req, res, next) {
    // Extraction des valeurs du nom d'utilisateur et du mot de passe à partir du corps de la requête
    const { login, password } = req.body;

    // Vérification si les valeurs du nom d'utilisateur et du mot de passe sont définies dans le corps de la requête
    if (login === undefined || password === undefined) {
      // Si l'une des valeurs n'est pas définie, renvoie une réponse d'erreur avec un code HTTP 400 et un message "Formulaire non complet"
      return res.status(400).json({ Error: 'Formulaire non complet' });
    }

    // Recherche de l'utilisateur dans la base de données à l'aide de la méthode "findOne" de Sequelize
    const dataToControl = await User.findOne({ where: { login: login } });

    // Vérification si l'utilisateur a été trouvé dans la base de données
    if (dataToControl?.dataValues) {
      // Si l'utilisateur est trouvé, renvoie une réponse d'erreur avec un code HTTP 400 et un message "Utilisateur existe déjà"
      return res.status(400).json({ Error: 'Utilisateur existe déjà' });
    }

    // Si l'utilisateur n'a pas été trouvé, appelle la fonction "next()" pour passer au middleware suivant ou à la fonction de gestion de route.
    next();
  },
  // Fonction asynchrone nommée "uniqueProfil"
  async uniqueProfil(req, res, next) {
    try {
      // Extraction de l'ID utilisateur à partir des paramètres de la requête
      const userId = req.params.id;

      // Déclaration d'une variable pour stocker les données de profil en format JSON
      let jsonAsString;
      // Vérification si les données de profil ont été envoyées dans le corps de la requête en tant que chaîne JSON
      if (req.body?.jsonAsString) {
        // Si les données de profil sont présentes, les parser en objet JSON
        jsonAsString = JSON.parse(req.body?.jsonAsString);
      }

      // Vérification si le login existe déjà en base de données
      if (jsonAsString?.login) {
        // Recherche de l'utilisateur avec le même login dans la base de données
        const loginToControl = await User.findOne({
          where: { login: jsonAsString?.login },
        });
        // Vérification si un utilisateur avec le même login a été trouvé et si c'est un utilisateur différent de l'utilisateur actuel
        if (loginToControl && loginToControl.id != userId) {
          // Si un utilisateur avec le même login est trouvé, renvoie une réponse d'erreur avec un code HTTP 400 et un message "Ce login existe déjà"
          return res.status(400).json({ Error: 'Ce login existe déjà' });
        }
      }

      // Vérification si l'adresse e-mail existe déjà en base de données
      if (jsonAsString?.email) {
        // Recherche de l'utilisateur avec la même adresse e-mail dans la base de données
        const emailToControl = await User.findOne({
          where: { email: jsonAsString?.email },
        });
        // Vérification si un utilisateur avec la même adresse e-mail a été trouvé et si c'est un utilisateur différent de l'utilisateur actuel
        if (emailToControl && emailToControl.id != userId) {
          // Si un utilisateur avec la même adresse e-mail est trouvé, renvoie une réponse d'erreur avec un code HTTP 400 et un message "Cet Email existe déjà"
          return res.status(400).json({ Error: 'Cet Email existe déjà' });
        }
      }

      // Vérification si un fichier a été envoyé dans la requête
      if (req?.files?.length > 0) {
        // Recherche de la photo de profil actuelle de l'utilisateur dans la base de données
        const userPhotoProfil = await Photo.findOne({
          where: { user_id: userId },
          attributes: ['name'],
        });

        // Suppression du fichier de la photo de profil actuelle sur le serveur
        if (userPhotoProfil) {
          unlink(`app/photos/${userPhotoProfil?.name}`, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
          });
          // Suppression de l'enregistrement de la photo de profil actuelle dans la base de données
          await Photo.destroy({ where: { user_id: userId } });
        }
      }

      // Appelle la fonction "next()" pour passer au middleware suivant ou à la fonction de gestion de route
      next();
    } catch (err) {
      // En cas d'erreur, renvoie une réponse d'erreur avec un code HTTP 500 et l'erreur
      res.status(500).json(err);
      console.log(err);
    }
  },
  async loginNotEmpty(req, res, next) {
    const { login, password } = req.body;
    // Si l'un des champs est manquant, renvoie une réponse d'erreur 400
    if (login === undefined || password === undefined) {
      return res.status(400).json({ Error: 'Formulaire non complet' });
    }
    // Sinon, passe à l'étape suivante en appelant la fonction middleware 'next'
    next();
  },
  // Vérification de la présence de données essentielles dans le formulaire et contrôle de l'unicité du titre de l'activité
  async uniqueActivity(req, res, next) {
    let jsonAsString;
    if (req.body?.jsonAsString) {
      jsonAsString = JSON.parse(req.body?.jsonAsString);
    }

    // Vérification de la présence des données essentielles dans le formulaire
    if (
      jsonAsString?.title === undefined ||
      jsonAsString?.sport_id === undefined ||
      jsonAsString?.user_id === undefined
    ) {
      // Suppression des fichiers téléchargés s'ils existent, et renvoi d'un message d'erreur au client
      if (req?.file?.filename) console.log('ICI : ');
      unlink(`app/photos/${req?.file?.filename}`, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
      return res.status(400).json({ Error: 'Formulaire non complet' });
    }

    // Vérification de l'unicité du titre de l'activité en base de données
    const dataToControl = await Activity.findOne({
      where: { title: jsonAsString.title },
    });
    if (dataToControl?.dataValues && req?.files != undefined) {
      // Suppression des fichiers téléchargés s'ils existent
      req?.files.forEach((file) =>
        unlink(`app/photos/${file.filename}`, (err) => {
          if (err) throw err;
          console.log('path/file.txt was deleted');
        }),
      );
    }
    if (dataToControl?.dataValues) {
      // Renvoi d'un message d'erreur au client si le titre de l'activité est déjà présent en base de données
      return res.status(400).json({ Error: "Nom d'activité déjà existant" });
    }

    // Si tout est ok, on passe la main au middleware suivant
    next();
  },
};
