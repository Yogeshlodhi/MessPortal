import refreshTokenModel from '../Models/refreshTokenModel.js';
import ApiError from '../Utils/ApiError.js';
import {
  signAccessToken,
  generateRefreshToken,
  hashToken,
  generateTokenFamily,
  REFRESH_TOKEN_EXPIRES_MS,
} from '../Utils/tokens.js';
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  accessCookieOptions,
  refreshCookieOptions,
  clearAccessCookieOptions,
  clearRefreshCookieOptions,
} from '../Utils/cookie.js';

/** Sets both auth cookies on the response for the given principal + raw refresh token. */
const setAuthCookies = (res, { userId, role, rawRefreshToken }) => {
  const accessToken = signAccessToken({ id: userId, role });
  res.cookie(ACCESS_COOKIE, accessToken, accessCookieOptions());
  res.cookie(REFRESH_COOKIE, rawRefreshToken, refreshCookieOptions());
};

/** Removes both auth cookies (used on logout / failed refresh). */
export const clearAuthCookies = (res) => {
  res.clearCookie(ACCESS_COOKIE, clearAccessCookieOptions());
  res.clearCookie(REFRESH_COOKIE, clearRefreshCookieOptions());
};

/**
 * Issues a brand-new token pair for a fresh login/registration: a new refresh
 * family + row, and both cookies set on `res`.
 */
export const issueAuthTokens = async (res, { userId, role }) => {
  const rawRefreshToken = generateRefreshToken();
  const family = generateTokenFamily();

  await refreshTokenModel.create({
    user: userId,
    role,
    tokenHash: hashToken(rawRefreshToken),
    family,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
  });

  setAuthCookies(res, { userId, role, rawRefreshToken });
};

/**
 * Rotates a presented refresh token:
 *   - unknown token            → 401 (never issued, or already TTL-purged)
 *   - revoked token (reuse!)   → revoke the whole family, then 401
 *   - expired token            → 401
 *   - valid token              → revoke it, issue a fresh one in the same family,
 *                                set new cookies, and return { userId, role }
 */
export const rotateAuthTokens = async (res, rawRefreshToken) => {
  if (!rawRefreshToken) {
    throw ApiError.unauthorized('No refresh token provided. Please login again.');
  }

  const current = await refreshTokenModel.findOne({ tokenHash: hashToken(rawRefreshToken) });

  if (!current) {
    throw ApiError.unauthorized('Invalid session. Please login again.');
  }

  // Reuse of an already-rotated token => likely theft. Burn the whole family.
  if (current.revoked) {
    await refreshTokenModel.updateMany({ family: current.family }, { revoked: true });
    throw ApiError.unauthorized('Session reuse detected. Please login again.');
  }

  if (current.expiresAt.getTime() <= Date.now()) {
    await current.deleteOne();
    throw ApiError.unauthorized('Session expired. Please login again.');
  }

  const { user: userId, role, family } = current;

  // Rotate: mark the old one revoked, mint a successor in the same family.
  current.revoked = true;
  await current.save();

  const rawRefreshTokenNext = generateRefreshToken();
  await refreshTokenModel.create({
    user: userId,
    role,
    tokenHash: hashToken(rawRefreshTokenNext),
    family,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
  });

  setAuthCookies(res, { userId, role, rawRefreshToken: rawRefreshTokenNext });
  return { userId, role };
};

/** Revokes the presented refresh token on logout (best-effort; never throws). */
export const revokeRefreshToken = async (rawRefreshToken) => {
  if (!rawRefreshToken) return;
  await refreshTokenModel.updateOne(
    { tokenHash: hashToken(rawRefreshToken) },
    { revoked: true },
  );
};

/** Revokes every refresh token for a user (e.g. password change, force logout). */
export const revokeAllForUser = async (userId) => {
  await refreshTokenModel.updateMany({ user: userId }, { revoked: true });
};
