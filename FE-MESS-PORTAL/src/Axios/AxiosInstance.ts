import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT_MS } from 'Utils/Common/configs';
import { generateRequestId, setLastRequestId } from 'Utils/Common/storage';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    requestId?: string;
    // Set once we've already attempted a silent refresh for this request, so we
    // never retry-loop on a request that 401s again after refreshing.
    _retry?: boolean;
    // Marks the refresh call itself, so its own 401 doesn't trigger a refresh.
    _skipAuthRefresh?: boolean;
  }
  export interface AxiosRequestConfig {
    requestId?: string;
    _retry?: boolean;
    _skipAuthRefresh?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const requestId = generateRequestId();
  config.requestId = requestId;
  setLastRequestId(requestId);
  return config;
});

// Endpoints where a 401 means "bad credentials / no session" rather than "access
// token expired" — refreshing there is pointless and would mask the real error.
const isAuthEndpoint = (url?: string): boolean =>
  !!url && (/\/login$/.test(url) || /\/register$/.test(url) || url.includes('/refresh'));

// Single in-flight refresh shared by all requests that 401 concurrently, so a
// burst of expired-token responses triggers exactly one /refresh round-trip.
let refreshPromise: Promise<void> | null = null;

const refreshSession = (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = axiosInstance
      .post('/refresh', null, { _skipAuthRefresh: true })
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

const notifyUnauthorized = () => {
  const onAuthRoute =
    window.location.pathname.includes('/login') || window.location.pathname.includes('/register');
  if (!onAuthRoute) {
    window.dispatchEvent(new CustomEvent('mp:unauthorized'));
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.response && !navigator.onLine) {
      return Promise.reject({ ...error, isOffline: true });
    }

    const originalRequest = error.config as InternalAxiosRequestConfig | undefined;
    const status = error.response?.status;

    // Access token likely expired: refresh once, then replay the original request.
    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest._skipAuthRefresh &&
      !isAuthEndpoint(originalRequest.url)
    ) {
      originalRequest._retry = true;
      try {
        await refreshSession();
        return axiosInstance(originalRequest);
      } catch {
        notifyUnauthorized();
        return Promise.reject(error);
      }
    }

    // Unrecoverable 401 (refresh failed, or a non-refreshable endpoint).
    if (
      status === 401 &&
      !originalRequest?._skipAuthRefresh &&
      !isAuthEndpoint(originalRequest?.url)
    ) {
      notifyUnauthorized();
    }

    return Promise.reject(error);
  },
);

export type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig['method'];
  body?: unknown;
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};
