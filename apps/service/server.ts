import app from './app';
import { connectToDatabase } from './utils/database';

const port = process.env.PORT || 8080;

import { Server } from 'http';

let server: Server;

const startServer = async () => {
  try {
    await connectToDatabase();
    server = app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

const shutdownServer = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  }
};

process.on('SIGTERM', shutdownServer);
process.on('SIGINT', shutdownServer);

startServer();
