import rateLimit from 'express-rate-limit';
import { statusCode } from '../Utils/http.js';

const handler = (req, res) =>
  res
    .status(statusCode.tooManyRequests)
    .json({ message: 'Too many requests, please try again later.' });

/** Tight limiter for auth endpoints to slow down credential-stuffing. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

/** Broad limiter applied to the whole API surface. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
