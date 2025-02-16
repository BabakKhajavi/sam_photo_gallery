import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';
import compression from 'compression';
import { corsOptions } from './config/cors';
import { handleRoutes } from './routes/routes';
import { errorHandler } from './middleware/error-handler';

dotenv.config();

const app: Application = express();

// Use compression middleware

app.use(compression());

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/health', (req, res) => {
  res.status(200).send({ is_healthy: true });
});
handleRoutes(app);

app.use(errorHandler);

export default app;
