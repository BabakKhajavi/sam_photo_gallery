import { ErrorMessages, ErrorStatusCode } from '../types';
import jwt, { Secret } from 'jsonwebtoken';

export const isAuthorized = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(ErrorStatusCode.NOT_AUTHORIZED)
      .send(ErrorMessages.NoAuthorized);
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY as Secret, (err: any) => {
    if (err) {
      return res
        .status(ErrorStatusCode.FORBIDDEN)
        .send(ErrorMessages.NoPermission);
    }
    return next();
  });
};
