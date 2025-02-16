import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Contact } from '../../models/contact';
import { isAuthorized } from '../../middleware/user-validator';
import { contactValidators } from './contact-validators';
import { validateRequest } from '../../middleware/request-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Contact.findById(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Contact.find();
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
        let payload = { ...req.body };
        const contact = new Contact(payload);
        await contact.save();
        res.status(SuccessStatusCode.CREATED).send(contact);
      } catch (error) {
        next(error);
      }
    },
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
        const result = await Contact.findByIdAndUpdate(id, payload, {
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
    contactValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);

      const result = await Contact.findByIdAndDelete(id);
      if (!result) {
        return next(HttpError.notFound(ErrorMessages.NoRecordFound));
      }
      res.status(SuccessStatusCode.OK).send(result);
    },
  );

export { router as contactController };
