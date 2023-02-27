import express from 'express';
const mainRouter = express.Router();

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

export { mainRouter };
