/**
 * Operational error carrying an HTTP status code.
 *
 * Throwing `new ApiError(404, 'Not found')` anywhere in a service/controller is
 * caught by the central error handler and translated into a clean JSON
 * response, replacing the old pattern of throwing bare `{ message }` objects.
 */
import { statusCode } from './http.js';

class ApiError extends Error {
  constructor(status = statusCode.internalServerError, message = 'Something went wrong') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(message) {
    return new ApiError(statusCode.badRequest, message);
  }

  static unauthorized(message = 'Authentication required') {
    return new ApiError(statusCode.unauthorized, message);
  }

  static forbidden(message = 'You are not allowed to access this resource') {
    return new ApiError(statusCode.forbidden, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(statusCode.notFound, message);
  }

  static conflict(message) {
    return new ApiError(statusCode.conflict, message);
  }
}

export default ApiError;
