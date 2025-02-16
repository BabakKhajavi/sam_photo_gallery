import express, { Application } from 'express';
import path from 'path';
import {
  advertisementController,
  authController,
  planController,
  categoryController,
  cityController,
  findusController,
  galleryController,
  reviewController,
  homeController,
  requestController,
  contactController,
} from '../controllers';
export function handleRoutes(app: Application): void {
  // static
  app.use(
    '/api/static/request',
    express.static(path.join(__dirname, '..', 'public/request')),
  );
  app.use(
    '/api/static/jumbo',
    express.static(path.join(__dirname, '..', 'public/jumbotron')),
  );
  app.use(
    '/api/static/gallery',
    express.static(path.join(__dirname, '..', 'public/gallery')),
  );
  app.use(
    '/api/static/plan',
    express.static(path.join(__dirname, '..', 'public/plan')),
  );
  app.use(
    '/api/static/welcome',
    express.static(path.join(__dirname, '..', 'public/welcome')),
  );
  // dynamic
  app.use('/api/auth', authController);
  app.use('/api/contact', contactController);
  app.use('/api/advertisement', advertisementController);
  app.use('/api/plan', planController);
  app.use('/api/category', categoryController);
  app.use('/api/city', cityController);
  app.use('/api/findus', findusController);
  app.use('/api/gallery', galleryController);
  app.use('/api/home', homeController);
  app.use('/api/review', reviewController);
  app.use('/api/home', homeController);
  app.use('/api/request', requestController);
}
