/**
 * Builds auth-cookie options consistent across login/register/logout.
 *
 * In production the SPA is served from a different origin, so the cookie must
 * be `SameSite=None; Secure`. In development over http://localhost that combo
 * is rejected by browsers, so we fall back to `SameSite=Lax` (no Secure).
 */
export const authCookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const days = Number(process.env.COOKIE_EXPIRES_TIME) || 7;
  return {
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
  };
};

/** Matching options used to clear the auth cookie on logout. */
export const clearCookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
  };
};
