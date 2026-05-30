import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

/**
 * Token primitives for the access/refresh scheme.
 *
 *  - Access token: a short-lived, self-contained JWT carried in the
 *    `accessToken` cookie and verified on every protected request.
 *  - Refresh token: a long-lived, opaque random string carried in the
 *    `refreshToken` cookie. Only its hash is persisted (see refreshTokenModel).
 */

// Short by design — limits the blast radius if an access token ever leaks.
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || '15m';

// Long-lived; the refresh cookie + DB row live this long.
export const REFRESH_TOKEN_EXPIRES_DAYS =
  Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) || Number(process.env.COOKIE_EXPIRES_TIME) || 7;

export const REFRESH_TOKEN_EXPIRES_MS = REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000;

/** Signs a short-lived access JWT for the given principal. */
export const signAccessToken = ({ id, role }) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });

/** Verifies an access JWT, returning its decoded payload (throws if invalid). */
export const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

/** A cryptographically-random opaque refresh token (raw value, sent to client). */
export const generateRefreshToken = () => crypto.randomBytes(48).toString('hex');

/** SHA-256 hex of a raw token — what we persist and look up by. */
export const hashToken = (raw) => crypto.createHash('sha256').update(raw).digest('hex');

/** A random id grouping one login session's rotation chain. */
export const generateTokenFamily = () => crypto.randomBytes(16).toString('hex');
