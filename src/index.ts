/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './database/data-source';

dotenv.config();

const PORT = Number(process.env.APP_PORT) || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connection success');
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is listening on the port: ${PORT}`);
});
