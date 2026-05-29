import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'Axios/AxiosInterceptor';
import { onQueryStartedErrorToast } from 'Utils/Common/rtkQueryErrorHandler';
import type { IApiEnvelope } from 'Common/types/api.types';
import type { IMessContact, IMessInfo, IMessInfoPayload } from 'Common/types/domain.types';

export const MessInfoApi = createApi({
  reducerPath: 'messInfoApi',
  baseQuery: customBaseQuery,
  tagTypes: ['MessInfo'],
  endpoints: (builder) => ({
    getStudentMessInfo: builder.query<IMessInfo | null, void>({
      query: () => ({ method: 'GET', url: '/student/messInfo' }),
      transformResponse: (response: IApiEnvelope<IMessInfo | Record<string, never>>) =>
        response.data && '_id' in response.data ? (response.data as IMessInfo) : null,
      providesTags: ['MessInfo'],
    }),
    getAdminMessInfo: builder.query<IMessInfo | null, void>({
      query: () => ({ method: 'GET', url: '/admin/messInfo' }),
      transformResponse: (response: IApiEnvelope<IMessInfo | Record<string, never>>) =>
        response.data && '_id' in response.data ? (response.data as IMessInfo) : null,
      providesTags: ['MessInfo'],
    }),
    addMessInfo: builder.mutation<IMessInfo, IMessInfoPayload>({
      query: (body) => ({ method: 'POST', url: '/admin/messInfo', body }),
      transformResponse: (response: IApiEnvelope<IMessInfo>) => response.data,
      invalidatesTags: ['MessInfo'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateMessInfo: builder.mutation<IMessInfo, { id: string; body: IMessInfoPayload }>({
      query: ({ id, body }) => ({ method: 'PUT', url: `/admin/messInfo/${id}`, body }),
      transformResponse: (response: IApiEnvelope<IMessInfo>) => response.data,
      invalidatesTags: ['MessInfo'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    addMessInfoContact: builder.mutation<IMessInfo, { id: string; body: IMessContact }>({
      query: ({ id, body }) => ({ method: 'POST', url: `/admin/messInfo/addContact/${id}`, body }),
      transformResponse: (response: IApiEnvelope<IMessInfo>) => response.data,
      invalidatesTags: ['MessInfo'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const {
  useGetStudentMessInfoQuery,
  useGetAdminMessInfoQuery,
  useAddMessInfoMutation,
  useUpdateMessInfoMutation,
  useAddMessInfoContactMutation,
} = MessInfoApi;
