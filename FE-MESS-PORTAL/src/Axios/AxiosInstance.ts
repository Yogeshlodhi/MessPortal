import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT_MS } from 'Utils/Common/configs';
import { generateRequestId, setLastRequestId } from 'Utils/Common/storage';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    requestId?: string;
  }
  export interface AxiosRequestConfig {
    requestId?: string;
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response && !navigator.onLine) {
      return Promise.reject({ ...error, isOffline: true });
    }
    if (error.response?.status === 401) {
      const onAuthRoute =
        window.location.pathname.includes('/login') ||
        window.location.pathname.includes('/register');
      if (!onAuthRoute) {
        window.dispatchEvent(new CustomEvent('mp:unauthorized'));
      }
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
