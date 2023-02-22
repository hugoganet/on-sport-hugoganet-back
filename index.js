import express from 'express';
import 'dotenv/config';
const app = express();
import { router } from './app/routers/index.js';
import { sequelize } from './app/dataSource/onSportSource.js';

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

// Connexion Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.listen(port, () => {
  console.log(`server Express started on port : ${port}`);
});
