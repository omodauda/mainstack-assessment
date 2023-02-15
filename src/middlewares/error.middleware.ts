import { Request, Response } from 'express';
import errorHandler from 'src/utils/handlers/error.handler';

function errorMiddleware(
  error: errorHandler,
  req: Request,
  res: Response,
): void {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res
    .status(status)
    .json({
      status: 'fail',
      message
    });
}

export default errorMiddleware;