import { NextFunction, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import { validationResult } from 'express-validator';
import cors from 'cors';
import { appError } from '../utils';
import conf from '../config';

const { accessDomain } = conf;

export const globalErrHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stack = err.stack;
  let message = err.message;
  const status = err.status ? err.status : 'failed';
  const statusCode = err.statusCode ? err.statusCode : 500;

  if (statusCode === 500) {
    message = 'Internal Server Error';
  }

  return res.status(statusCode).json({
    stack,
    message,
    status,
    statusCode
  });
};

/**
 * Rate limit middleware
 */
export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'You have exceeded your 5 requests per minute limit.',
  headers: true,
});

/**
 * @middleware isValidationResult
 *
 * This middleware function helps check if the request is valid based on the headers.
 */
export async function isValidationResult(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors: any = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError(errors?.errors[0]?.msg, 400));
  }

  next();
}

/**
 * @middleware CORS
 */
export const middlewareCors = cors({
  origin: function (origin, callback) {
    if (accessDomain.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Accept'],
  credentials: true,
  exposedHeaders: ['*', 'Authorization' ]
});
