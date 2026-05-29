import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError } from 'axios';
import _get from 'lodash/get';
import { axiosInstance, AxiosBaseQueryArgs } from './AxiosInstance';
import { IApiError } from 'Common/types/api.types';

export const customBaseQuery: BaseQueryFn<AxiosBaseQueryArgs, unknown, IApiError> = async ({
  url,
  method = 'GET',
  body,
  params,
  headers,
}) => {
  try {
    const response = await axiosInstance.request({
      url,
      method,
      data: body,
      params,
      headers,
    });
    return { data: response.data };
  } catch (err) {
    const axiosError = err as AxiosError<{ message?: string; error?: string }>;
    const status = axiosError.response?.status ?? 0;
    const message =
      _get(axiosError, 'response.data.message') ||
      _get(axiosError, 'response.data.error') ||
      axiosError.message ||
      'Something went wrong';
    const transactionId = axiosError.config?.requestId ?? null;
    const isOffline = Boolean((axiosError as unknown as { isOffline?: boolean }).isOffline);

    return {
      error: { status, message, transactionId, isOffline },
    };
  }
};
