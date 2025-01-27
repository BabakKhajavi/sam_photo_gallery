import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Advertisement } from '../../models/advertisement';
import { isAuthorized } from '../../middleware/user-validator';
import { advertisementValidators } from './advertisement-validators';
import { validateRequest } from '../../middleware/request-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Advertisement.findByPk(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Advertisement.findAll();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    advertisementValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      console.log('req.body', req.body);
      try {
        let payload = { ...req.body };
        const approach = await Advertisement.create(payload);
        res.status(SuccessStatusCode.CREATED).send(approach);
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    advertisementValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const payload = { ...req.body };
        const result = await Advertisement.findByPk(id);
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        await result.update(payload);
        res.status(SuccessStatusCode.OK).send(result);
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .delete(
    isAuthorized,
    advertisementValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);

      const result = await Advertisement.findByPk(id);
      if (!result) {
        return next(HttpError.notFound(ErrorMessages.NoRecordFound));
      }
      await result.destroy();
      res.status(SuccessStatusCode.OK).send(result);
    }
  );

export { router as advertisementController };
