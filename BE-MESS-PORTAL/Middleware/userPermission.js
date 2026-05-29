import jwt from 'jsonwebtoken';
import adminModel from '../Models/adminModel.js';
import ApiError from '../Utils/ApiError.js';
import asyncHandler from '../Utils/asyncHandler.js';

/**
 * Authenticates an admin from the `token` cookie and attaches the minimal set
 * of fields (`_id`, `firstName`, `adminType`) needed downstream as a lean
 * object on `req.user`.
 */
const authenticateUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw ApiError.unauthorized('Please log in as an authorized user to access this resource');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw ApiError.unauthorized('Authentication failed. Please login again.');
  }

  const admin = await adminModel
    .findById(decoded.id)
    .select('_id firstName adminType')
    .lean();

  if (!admin) {
    throw ApiError.unauthorized('User not found');
  }

  req.user = admin;
  next();
});

/** Restricts a route to the given admin roles. */
const authorizeRoles = (roles) => (req, res, next) => {
  if (!roles.includes(req.user?.adminType)) {
    throw ApiError.forbidden(`${req.user?.adminType} is not allowed to access this resource`);
  }
  next();
};

export { authenticateUser, authorizeRoles };
