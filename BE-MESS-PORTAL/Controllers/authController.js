import asyncHandler from '../Utils/asyncHandler.js';
import { statusCode } from '../Utils/http.js';
import { REFRESH_COOKIE } from '../Utils/cookie.js';
import { rotateAuthTokens, revokeRefreshToken, clearAuthCookies } from '../Services/tokenService.js';

/**
 * POST /api/refresh
 * Role-agnostic: the refresh-token row carries the role, so a single endpoint
 * serves both students and admins. Rotates the token pair and re-sets cookies.
 */
export const refreshTokens = asyncHandler(async (req, res) => {
  const rawRefreshToken = req.cookies?.[REFRESH_COOKIE];
  try {
    const { role } = await rotateAuthTokens(res, rawRefreshToken);
    res.status(statusCode.ok).json({ message: 'Token refreshed', success: true, data: { role } });
  } catch (err) {
    // Any refresh failure should leave the client with no stale cookies.
    clearAuthCookies(res);
    throw err;
  }
});

/**
 * Shared logout for students and admins: revoke the presented refresh token
 * server-side (real revocation) and clear both cookies.
 */
export const logout = asyncHandler(async (req, res) => {
  await revokeRefreshToken(req.cookies?.[REFRESH_COOKIE]);
  clearAuthCookies(res);
  res.status(statusCode.ok).json({ message: 'Logged Out', success: true });
});
