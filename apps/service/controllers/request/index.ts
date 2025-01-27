import express, {
  type Express,
  Request as ExpressRequest,
  Response,
  NextFunction,
} from 'express';
import { Request } from '../../models/request';
import { isAuthorized } from '../../middleware/user-validator';
import { cleanUpFile, multipleFileUpload } from '../../utils/file-upload';
import { ErrorMessages, MediaPath, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
import { requestValidators } from './request-validators';
import { validateRequest } from '../../middleware/request-validator';

const router = express.Router();

router
  .route('/:id')
  .get(async (req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Request.findByPk(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
      const result = await Request.findAll();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router.route('/').post(
  isAuthorized,
  multipleFileUpload(MediaPath.REQUEST, [
    { name: 'media1', maxCount: 1 },
    { name: 'media2', maxCount: 1 },
    { name: 'media3', maxCount: 1 },
  ]),
  requestValidators.createValidator,
  validateRequest,
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    try {
      const media1FilePath = files?.['media1']?.[0]?.path ?? '';
      const media2FilePath = files?.['media2']?.[0]?.path ?? '';
      const media3FilePath = files?.['media3']?.[0]?.path ?? '';
      const payload = {
        ...req.body,
        media1: media1FilePath,
        media2: media2FilePath,
        media3: media3FilePath,
      };

      const request = await Request.create(payload);
      res
        .status(SuccessStatusCode.CREATED)
        .send({ message: 'Request created!', request });
    } catch (error) {
      if (files.media) {
        cleanUpFile(files?.['media']?.[0]?.path);
      }
      if (files.media_thumb) {
        cleanUpFile(files?.['media_thumb']?.[0]?.path);
      }
      next(error);
    }
  }
);

router.route('/:id').put(
  isAuthorized,
  requestValidators.updateValidator,
  validateRequest,
  multipleFileUpload(MediaPath.REQUEST, [
    { name: 'media1', maxCount: 1 },
    { name: 'media2', maxCount: 1 },
    { name: 'media3', maxCount: 1 },
  ]),
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const media1FilePath = files?.['media1']?.[0]?.path ?? '';
      const media2FilePath = files?.['media2']?.[0]?.path ?? '';
      const media3FilePath = files?.['media3']?.[0]?.path ?? '';
      const result = await Request.findByPk(id);
      if (result?.media1) cleanUpFile(result.media1);
      if (result?.media2) cleanUpFile(result.media2);
      if (result?.media3) cleanUpFile(result.media3);
      if (!result) {
        return next(HttpError.notFound(ErrorMessages.NoRecordFound));
      }
      const payload = {
        ...req.body,
        media1: media1FilePath || result.media1,
        media2: media2FilePath || result.media2,
        media3: media3FilePath || result.media3,
      };
      await result.update(payload);
      res.status(SuccessStatusCode.OK).send({ message: 'Request updated!' });
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
    requestValidators.deleteValidator,
    validateRequest,
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);

        const result = await Request.findByPk(id);
        if (!result) {
          next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }

        await Request.destroy({ where: { id } });
        if (result?.media1) cleanUpFile(result.media1);
        if (result?.media2) cleanUpFile(result.media2);
        if (result?.media3) cleanUpFile(result.media3);
        res.status(SuccessStatusCode.OK).send(result);
      } catch (error) {
        next(error);
      }
    }
  );

export { router as requestController };
