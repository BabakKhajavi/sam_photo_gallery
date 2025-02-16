import express, { Request, Response, NextFunction } from 'express';
import { Gallery } from '../../models/gallery';
import { isAuthorized } from '../../middleware/user-validator';
import { cleanUpFile, multipleFileUpload } from '../../utils/file-upload';
import { ErrorMessages, MediaPath, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
import { galleryValidators } from './gallery-validators';
import { validateRequest } from '../../middleware/request-validator';
const router = express.Router();
router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Gallery.findById(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Gallery.find();
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router.route('/').post(
  isAuthorized,
  multipleFileUpload(MediaPath.GALLERY, [
    { name: 'media', maxCount: 1 },
    { name: 'media_thumb', maxCount: 1 },
  ]),
  galleryValidators.createValidator,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    try {
      const mediaFilePath = files?.['media']?.[0]?.path ?? '';
      const mediaThumbFilePath = files?.['media_thumb']?.[0]?.path ?? '';
      const payload = {
        ...req.body,
        media: mediaFilePath,
        media_thumb: mediaThumbFilePath,
      };

      const gallery = new Gallery(payload);
      await gallery.save();
      res
        .status(SuccessStatusCode.CREATED)
        .send({ message: 'Gallery created!', gallery });
    } catch (error) {
      if (files.media) {
        cleanUpFile(files?.['media']?.[0]?.path);
      }
      if (files.media_thumb) {
        cleanUpFile(files?.['media_thumb']?.[0]?.path);
      }
      next(error);
    }
  },
);

router.route('/:id').put(
  isAuthorized,
  galleryValidators.updateValidator,
  validateRequest,
  multipleFileUpload(MediaPath.GALLERY, [
    { name: 'media', maxCount: 1 },
    { name: 'media_thumb', maxCount: 1 },
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const mediaFilePath = files?.['media']?.[0]?.path ?? '';
      const mediaThumbFilePath = files?.['media_thumb']?.[0]?.path ?? '';

      const existingGallery = await Gallery.findById(id);
      if (!existingGallery) {
        return next(HttpError.notFound(ErrorMessages.NoRecordFound));
      }

      const payload = {
        ...req.body,
        media: mediaFilePath || existingGallery.media,
        media_thumb: mediaThumbFilePath || existingGallery.media_thumb,
      };

      const updatedGallery = await Gallery.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });

      if (existingGallery.media && mediaFilePath) {
        cleanUpFile(existingGallery.media);
      }

      res
        .status(SuccessStatusCode.OK)
        .send({ message: 'Gallery updated!', gallery: updatedGallery });
    } catch (error) {
      next(error);
    }
  },
);

router
  .route('/:id')
  .delete(
    isAuthorized,
    galleryValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;

        const existingGallery = await Gallery.findById(id);
        if (!existingGallery) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }

        await Gallery.findByIdAndDelete(id);
        if (existingGallery.media) {
          cleanUpFile(existingGallery.media);
        }

        res
          .status(SuccessStatusCode.OK)
          .send({ message: 'Gallery deleted!', gallery: existingGallery });
      } catch (error) {
        next(error);
      }
    },
  );

export { router as galleryController };
