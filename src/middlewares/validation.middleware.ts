import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { Schema } from 'joi';

function validationMiddleware(schema: Schema): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);
    if (result.error) {
      const error = result.error.details[0].message;
      return res
        .status(400)
        .json({
          status: 'fail',
          error
        });
    }
    next();
  };
}

export default validationMiddleware;