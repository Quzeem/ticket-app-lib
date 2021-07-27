import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);

    // Needs to be added when extending to a class in typescript
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return {
      status: 'fail',
      message: this.message,
    };
  }
}
