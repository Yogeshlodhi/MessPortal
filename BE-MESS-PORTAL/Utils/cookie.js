import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES_MS } from './tokens.js';

/**
 * Auth cookies are `httpOnly` (invisible to JS, so XSS can't read them).
 *
 * In production the SPA is served from a different origin than the API, so the
 * cookies must be `SameSite=None; Secure`. Over http://localhost in development
 * that combo is rejected by browsers, so we fall back to `SameSite=Lax`.
 *
 * Both cookies are scoped to `/api` so they're never sent to non-API paths.
 */

export const ACCESS_COOKIE = 'accessToken';
export const REFRESH_COOKIE = 'refreshToken';

const ACCESS_COOKIE_PATH = '/api';
const REFRESH_COOKIE_PATH = '/api';

const baseOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
  };
};

// Roughly mirror the access-token JWT lifetime for the cookie's own maxAge.
// Defaults to 15 minutes; bumped to an hour ceiling only matters if the token
// TTL is configured higher — the JWT expiry is the real source of truth.
const accessMaxAgeMs = () => {
  const raw = String(ACCESS_TOKEN_EXPIRES);
  const match = raw.match(/^(\d+)\s*(s|m|h|d)?$/i);
  if (!match) return 15 * 60 * 1000;
  const value = Number(match[1]);
  const unit = (match[2] || 's').toLowerCase();
  const unitMs = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }[unit];
  return value * unitMs;
};

/** Options for the short-lived access-token cookie. */
export const accessCookieOptions = () => ({
  ...baseOptions(),
  path: ACCESS_COOKIE_PATH,
  maxAge: accessMaxAgeMs(),
});

/** Options for the long-lived refresh-token cookie. */
export const refreshCookieOptions = () => ({
  ...baseOptions(),
  path: REFRESH_COOKIE_PATH,
  maxAge: REFRESH_TOKEN_EXPIRES_MS,
});

/** Matching options to clear the access cookie (path must match to delete it). */
export const clearAccessCookieOptions = () => ({ ...baseOptions(), path: ACCESS_COOKIE_PATH });

/** Matching options to clear the refresh cookie. */
export const clearRefreshCookieOptions = () => ({ ...baseOptions(), path: REFRESH_COOKIE_PATH });
