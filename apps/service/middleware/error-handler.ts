import { ErrorStatusCode } from '../types';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(res instanceof Response)) {
    console.error('res is not an instance of Response');
    return next(err);
  }

  console.log('req', req);
  res.status(err.status || ErrorStatusCode).send({
    message: err.message || 'Internal Server Error',
  });
}
