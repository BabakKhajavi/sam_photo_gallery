import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { FindUs } from '../../models/findus';
import { isAuthorized } from '../../middleware/user-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
import { findusValidators } from './findus-validators';
import { validateRequest } from '../../middleware/request-validator';

const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await FindUs.findByPk(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await FindUs.findAll();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    findusValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = { ...req.body };
        const findus = await FindUs.create(payload);
        res.status(SuccessStatusCode.CREATED).send(findus);
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    findusValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const payload = { ...req.body };
        const result = await FindUs.findByPk(id);
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        await result.update(payload);
        res.status(SuccessStatusCode.OK).send({ message: 'FindUs updated!' });
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .delete(
    isAuthorized,
    findusValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);

        const result = await FindUs.findByPk(id);
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        await result.destroy();
        res.status(SuccessStatusCode.OK).send(result);
      } catch (error) {
        next(error);
      }
    }
  );

export { router as findusController };
