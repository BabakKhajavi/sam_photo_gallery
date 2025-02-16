import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Review } from '../../models/review';
import { isAuthorized } from '../../middleware/user-validator';
import { reviewValidators } from './review-validators';
import { validateRequest } from '../../middleware/request-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Review.findById(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Review.find();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    reviewValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let payload = { ...req.body };
        const review = new Review(payload);
        await review.save();
        res.status(SuccessStatusCode.CREATED).send(review);
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    reviewValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const payload = { ...req.body };
        const result = await Review.findByIdAndUpdate(id, payload, {
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
    reviewValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);

      const result = await Review.findByIdAndDelete(id);
      if (!result) {
        return next(HttpError.notFound(ErrorMessages.NoRecordFound));
      }
      res.status(SuccessStatusCode.OK).send(result);
    },
  );

export { router as reviewController };
