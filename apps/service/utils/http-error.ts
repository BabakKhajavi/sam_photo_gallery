import { ErrorStatusCode } from '../types';

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  static badRequest(message: string) {
    return new HttpError(message, ErrorStatusCode.BAD_REQUEST);
  }

  static unauthorized(message: string) {
    return new HttpError(message, ErrorStatusCode.NOT_AUTHORIZED);
  }

  static forbidden(message: string) {
    return new HttpError(message, ErrorStatusCode.FORBIDDEN);
  }

  static notFound(message: string) {
    return new HttpError(message, ErrorStatusCode.NOT_FOUND);
  }

  static internalServerError(message: string) {
    return new HttpError(message, ErrorStatusCode.INTERNAL_SERVER_ERROR);
  }
}
