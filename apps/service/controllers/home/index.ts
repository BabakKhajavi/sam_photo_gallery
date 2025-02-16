import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Home } from '../../models/home';
import { isAuthorized } from '../../middleware/user-validator';
import { homeValidators } from './home-validators';
import { validateRequest } from '../../middleware/request-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Home.findById(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Home.find();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    homeValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let payload = { ...req.body };
        const home = new Home(payload);
        await home.save();
        res.status(SuccessStatusCode.CREATED).send(home);
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    homeValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const payload = { ...req.body };
        const result = await Home.findByIdAndUpdate(id, payload, {
          new: true,
          runValidators: true,
        });
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        res.status(SuccessStatusCode.OK).send(result);
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/:id')
  .delete(
    isAuthorized,
    homeValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);

      const result = await Home.findByIdAndDelete(id);
      if (!result) {
        return next(HttpError.notFound(ErrorMessages.NoRecordFound));
      }
      res.status(SuccessStatusCode.OK).send(result);
    },
  );

export { router as homeController };
