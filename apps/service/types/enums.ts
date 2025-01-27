export enum MediaPath {
  APPROACH = 'public/approach',
  GALLERY = 'public/gallery',
  WELCOME = 'public/welcome',
  REQUEST = 'public/request',
  JUMBOTRON = 'public/jumbotron',
}

export enum ErrorMessages {
  LoginMessage = 'Wrong Username or Password!',
  NoAuthorized = 'Not authenticated',
  NoPermission = 'Permission required',
  NoRecordFound = 'No record found',
}

export enum ErrorStatusCode {
  BAD_REQUEST = 400,
  NOT_AUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422,
}

export enum SuccessStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
}
