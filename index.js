// On importe les modules nécessaires
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './app/routers/index.js';
import { sequelize } from './app/dataSource/onSportSource.js';

// On initialise l'application "express"
const app = express();

// On définit le port sur lequel écouter
const port = process.env.PORT || 3000;

// On utilise les middlewares d'express pour gérer les données en entrée
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// On peut aussi utiliser un middleware pour gérer les fichiers envoyés via le formulaire
// app.use(upload.single());

// On configure les options de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // L'adresse du serveur autorisé à effectuer des requêtes
  credentials: true, // On autorise l'envoi des cookies avec les requêtes
  optionSuccessStatus: 200, // On fixe le code de succès pour les options preflight à 200
};

// On utilise le middleware "cors" avec les options définies précédemment
app.use(cors(corsOptions));

// Connexion à la base de données avec Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// On utilise les routes définies dans l'application
app.use(router);

// On lance l'application en écoutant sur le port défini précédemment
app.listen(port, () => {
  console.log(`server Express started on port : ${port}`);
});
