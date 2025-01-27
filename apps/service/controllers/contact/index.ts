import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Contact } from '../../models/contact';
import { isAuthorized } from '../../middleware/user-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
import { contactValidators } from './contact-validators';
import { validateRequest } from '../../middleware/request-validator';

const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Contact.findByPk(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Contact.findAll();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    contactValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = { ...req.body };
        const contact = await Contact.create(payload);
        res.status(SuccessStatusCode.CREATED).send(contact);
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    contactValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const payload = { ...req.body };
        const result = await Contact.findByPk(id);
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        await result.update(payload);
        res.status(SuccessStatusCode.OK).send({
          message: `Contact with id ${result.id} updated successfully!`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .delete(
    isAuthorized,
    contactValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);

        const result = await Contact.findByPk(id);
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        await result.destroy();
        res.status(SuccessStatusCode.OK).send({
          data: result,
          message: `Contact with id ${result.id} deleted successfully!`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

export { router as contactController };
