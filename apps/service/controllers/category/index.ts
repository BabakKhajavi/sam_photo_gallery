import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Category } from '../../models/category';
import { isAuthorized } from '../../middleware/user-validator';
import { categoryValidators } from './category-validators';
import { validateRequest } from '../../middleware/request-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Category.findById(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Category.find();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    categoryValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let payload = { ...req.body };
        const category = new Category(payload);
        await category.save();
        res.status(SuccessStatusCode.CREATED).send(category);
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    categoryValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const payload = { ...req.body };
        const result = await Category.findByIdAndUpdate(id, payload, {
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
    categoryValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);

      const result = await Category.findByIdAndDelete(id);
      if (!result) {
        return next(HttpError.notFound(ErrorMessages.NoRecordFound));
      }
      res.status(SuccessStatusCode.OK).send(result);
    },
  );

export { router as categoryController };
