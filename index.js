import express from 'express';
const app = express();
import { router } from './app/routers/index.js';
import { sequelize } from './app/dataSource/onSportSource.js';

app.use(express.urlencoded({ extended: false }));

sequelize
  .authenticate()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server Express started on port : ${port}`);
});
