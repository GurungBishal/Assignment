import express from 'express';
import helmet from 'helmet';
import http from 'http';
import dotenv from 'dotenv';
import ApiRoutes from './routes';
import connect from './db/connect';
import { typedLocalsSetup } from './middleware';

(async () => {
  const app = express();

  dotenv.config();

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(typedLocalsSetup);
  app.use('/api', ApiRoutes);

  app.get('/', (_, res) => {
    res.send('Hello World from Assignment API');
  });

  http.createServer(app).listen(4000, () => {
    connect();
    console.log('Server is running on port 4000');
  });
})();
