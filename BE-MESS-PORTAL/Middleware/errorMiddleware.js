import mongoose from 'mongoose';
import { statusCode } from '../Utils/http.js';

/** 404 handler for unmatched routes. Forwards to the error handler. */
export const notFound = (req, res) => {
  res.status(statusCode.notFound).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Central error handler. Normalises the many error shapes that flow through the
 * app (ApiError, Mongoose validation/cast/duplicate-key, JWT) into a consistent
 * JSON envelope. The stack trace is only exposed outside production.
 */
// eslint-disable-next-line no-unused-vars -- Express needs the 4-arg signature
export const errorHandler = (err, req, res, next) => {
  let status = err.status || err.statusCode || statusCode.internalServerError;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error -> 400 with the first field message.
  if (err instanceof mongoose.Error.ValidationError) {
    status = statusCode.badRequest;
    message = Object.values(err.errors)[0]?.message || 'Validation failed';
  }

  // Invalid ObjectId / cast error -> 400.
  if (err instanceof mongoose.Error.CastError) {
    status = statusCode.badRequest;
    message = `Invalid value for "${err.path}"`;
  }

  // Duplicate key -> 409 with the offending field.
  if (err.code === 11000) {
    status = statusCode.conflict;
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} already exists` : 'Duplicate value';
  }

  // JWT errors -> 401.
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = statusCode.unauthorized;
    message = 'Invalid or expired token. Please login again.';
  }

  if (status >= 500) {
    console.error('❌', req.method, req.originalUrl, '-', err);
  }

  const body = { message };
  if (process.env.NODE_ENV !== 'production') {
    body.stack = err.stack;
  }

  res.status(status).json(body);
};
