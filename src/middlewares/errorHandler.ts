import { Request, Response, NextFunction } from 'express';
// import { RequestValidationError } from '../utils/requestValidationError';
// import { NotFoundError } from '../utils/notFoundError';
import { CustomError } from '../errors/customError';

interface ErrObj extends Error {
  code: number;
  keyValue: object;
  errors: object;
}

// Global error handler
// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: ErrObj,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // // Log error
  // console.log(err.message);

  // if (err instanceof RequestValidationError) {
  //   return res.status(err.statusCode).send(err.serializeErrors());
  // }
  // if (err instanceof NotFoundError) {
  //   return res.status(err.statusCode).send(err.serializeErrors());
  // }

  // we can always be sure all instances of abstract class 'CustomError' will have a statusCode property and serializeErrors method
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  // Mongoose bad objectId
  if (err.name === 'CastError') {
    return res.status(400).send({
      status: 'fail',
      message: 'Resource not found',
    });
  }

  // Mongoose duplicate key value
  if (err.code === 11000) {
    const keyVal = Object.keys(err.keyValue)[0];
    const message = `${keyVal} already exists. Please, use a different ${keyVal}`;
    return res.status(400).send({
      status: 'fail',
      message,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messagesArr = Object.values(err.errors).map(
      (value) => value.message
    ) as string[];
    const message = `Invalid input data: ${messagesArr.join(', ')}`;
    return res.status(400).send({
      status: 'fail',
      message,
    });
  }

  // Default error response
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = `${statusCode}`.startsWith('4')
    ? err.message
    : 'Something went wrong!';

  res.status(statusCode).send({
    status: 'fail',
    message,
  });
};
