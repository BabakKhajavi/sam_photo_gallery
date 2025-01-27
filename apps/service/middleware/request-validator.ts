import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ErrorStatusCode } from '../types';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res
      .status(ErrorStatusCode.UNPROCESSABLE_ENTITY)
      .send({ errors: errors.array() });
  } else {
    next();
  }
};
