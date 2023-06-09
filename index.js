import express from 'express';
import 'dotenv/config';
const app = express();
import { router } from './app/routers/index.js';
import { sequelize } from './app/dataSource/onSportSource.js';
import cors from 'cors';
const port = process.env.PORT || 3000;
//
//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// for parsing multipart/form-data
// app.use(upload.single());
// Connexion Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => {
  console.log(`server Express started on port : ${port}`);
});
