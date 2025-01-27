import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Welcome } from '../../models/welcome';
import { isAuthorized } from '../../middleware/user-validator';
import { cleanUpFile, singleFileUpload } from '../../utils/file-upload';
import { ErrorMessages, MediaPath, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
import { welcomeValidators } from './welcome-validators';
import { validateRequest } from '../../middleware/request-validator';

const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Welcome.findByPk(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Welcome.findAll();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    singleFileUpload(MediaPath.WELCOME),
    welcomeValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let payload = { ...req.body, step: parseInt(req.body.step) };
        const formFile = req.file;
        if (formFile) {
          const filePath = formFile.path;
          payload = {
            ...payload,
            media: filePath,
          };
        }

        const welcome = await Welcome.create(payload);
        res.status(SuccessStatusCode.CREATED).send(welcome);
      } catch (error) {
        if (req.file) {
          cleanUpFile(req.file.path);
        }
        next(error);
      }
    }
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    singleFileUpload(MediaPath.WELCOME),
    welcomeValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const formFile = req.file;
        let payload = { ...req.body, step: parseInt(req.body.step) };
        const result = await Welcome.findByPk(id);
        if (formFile) {
          const filePath = formFile.path;
          payload = {
            ...payload,
            media: filePath,
          };
          if (result?.media) cleanUpFile(result.media);
        }
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        await result.update(payload);
        res.status(SuccessStatusCode.OK).send({ message: 'Welcome updated!' });
      } catch (error) {
        if (req.file) {
          cleanUpFile(req.file.path);
        }
        next(error);
      }
    }
  );

router
  .route('/:id')
  .delete(
    isAuthorized,
    welcomeValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);

        const result = await Welcome.findByPk(id);
        if (!result) {
          next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }

        await Welcome.destroy({ where: { id } });
        if (result?.media) cleanUpFile(result.media);
        res.status(SuccessStatusCode.OK).send(result);
      } catch (error) {
        next(error);
      }
    }
  );

export { router as welcomeController };
