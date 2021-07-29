import { CustomError } from './customError';

export class NotAuthorizedError extends CustomError {
  statusCode = 403;

  constructor() {
    super('Not Authorized');

    // Needs to be added when extending to a class in typescript
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return {
      status: 'fail',
      message: 'Not Authorized',
    };
  }
}
