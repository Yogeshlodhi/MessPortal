export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3001/api';

export const REQUEST_TIMEOUT_MS = 30_000;
