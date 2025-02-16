import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Plan } from '../../models/plan';
import { isAuthorized } from '../../middleware/user-validator';
import { planValidators } from './plan-validators';
import { validateRequest } from '../../middleware/request-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Plan.findById(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Plan.find();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    planValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let payload = { ...req.body };
        const plan = new Plan(payload);
        await plan.save();
        res.status(SuccessStatusCode.CREATED).send(plan);
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    planValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const payload = { ...req.body };
        const result = await Plan.findByIdAndUpdate(id, payload, {
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
    planValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);

      const result = await Plan.findByIdAndDelete(id);
      if (!result) {
        return next(HttpError.notFound(ErrorMessages.NoRecordFound));
      }
      res.status(SuccessStatusCode.OK).send(result);
    },
  );

export { router as planController };
