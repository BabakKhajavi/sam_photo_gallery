import mongoose from 'mongoose';
import { environment } from '../config/environments';
// import { initializeModels } from '../models';

export const connectToDatabase = async () => {
  console.log('Connecting to the database...', environment.dbUrl);
  try {
    await mongoose.connect(environment.dbUrl as string);
    console.log('Connection has been established successfully.');

    // initializeModels();
    console.log('Database models initialized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
