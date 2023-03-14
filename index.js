import express from 'express';
import 'dotenv/config';
const app = express();
import https from 'https';
import http from 'http';
import fs from 'fs';
import { router } from './app/routers/index.js';
import { sequelize } from './app/dataSource/onSportSource.js';
import cors from 'cors';
const port = process.env.PORT || 3000;
const portSecure = process.env.PORT_SECURE || 443;
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

const httpsOptions = {
  key: fs.readFileSync('./security/privkey.pem', 'utf8'),
  cert: fs.readFileSync('./security/fullchain.pem', 'utf8'),
};
http.createServer(app).listen(port);
https.createServer(httpsOptions, app).listen(portSecure);
