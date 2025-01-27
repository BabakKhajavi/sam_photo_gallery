import { Response, NextFunction } from 'express';

export const isLoggedInMember = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req?.session?.isLoggedInMember) {
    res.status(400).send('Invalid Session');
  }
  next();
};

export const isLoggedIn = (req: any, res: any, next: any) => {
  if (!req.session.isLoggedIn) {
    res.status(400).send('Invalid Session');
  }
  next();
};
