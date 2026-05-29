const REQUEST_ID_KEY = 'mp_last_request_id';

export const setLastRequestId = (id: string): void => {
  try {
    sessionStorage.setItem(REQUEST_ID_KEY, id);
  } catch {
    // sessionStorage may be unavailable (private mode, SSR)
  }
};

export const getLastRequestId = (): string | null => {
  try {
    return sessionStorage.getItem(REQUEST_ID_KEY);
  } catch {
    return null;
  }
};

export const generateRequestId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `req-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};
