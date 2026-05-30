import studentModel from '../Models/studentModel.js';
import ApiError from './ApiError.js';
import asyncHandler from './asyncHandler.js';
import { verifyAccessToken } from './tokens.js';
import { ACCESS_COOKIE } from './cookie.js';

/**
 * Authenticates a student from the short-lived `accessToken` cookie.
 *
 * Only the fields the downstream handlers actually need are projected and the
 * document is read `.lean()` (plain object, no hydration overhead). The result
 * is attached to `req.user`. An expired token returns 401, which the client
 * interceptor turns into a silent `/api/refresh` + retry.
 */
export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[ACCESS_COOKIE];
  if (!token) {
    throw ApiError.unauthorized('No token provided. Please login first.');
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch {
    throw ApiError.unauthorized('Invalid or expired token. Please login again.');
  }

  const student = await studentModel
    .findById(decoded.id)
    .select('_id studentRoll studentName emailId')
    .lean();

  if (!student) {
    throw ApiError.unauthorized('Invalid token. User not found.');
  }

  req.user = student;
  next();
});
