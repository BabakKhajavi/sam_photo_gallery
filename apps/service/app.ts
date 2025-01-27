import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';
import compression from 'compression';
import { corsOptions } from './config/cors';
import { handleRoutes } from './routes/routes';
import { errorHandler } from './middleware/error-handler';

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

const app: Application = express();

// Use compression middleware
app.use(compression());

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

handleRoutes(app);

app.use(errorHandler);

export default app;
