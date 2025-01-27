import { environment } from './environments';

export const corsOptions = {
  origin: environment.origins,
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'X-Access-Token',
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Methods',
    'Access-Control-Request-Headers',
  ],
  credentials: true,
  enablePreflight: true,
};
