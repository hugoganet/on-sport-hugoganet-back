// On importe le module "express" et on crée un objet routeur
import express from 'express';
const mainRouter = express.Router();

// On définit les routes de ce routeur pour la route principale '/'
mainRouter
  .route('/')
  .get((req, res, next) => {
    res.send('GET request called');
  })
  .post((req, res, next) => {
    res.send('POST request called');
  })
  .all((req, res, next) => {
    res.send('Other requests called');
  });

// On exporte l'objet routeur pour qu'il puisse être utilisé par l'application
export { mainRouter };
