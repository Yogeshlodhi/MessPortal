import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'Axios/AxiosInterceptor';
import { onQueryStartedErrorToast } from 'Utils/Common/rtkQueryErrorHandler';
import type { IApiEnvelope } from 'Common/types/api.types';
import type { IMenu, IMenuPayload } from 'Common/types/domain.types';

export const MenuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Menu'],
  endpoints: (builder) => ({
    getStudentMenu: builder.query<IMenu | null, void>({
      query: () => ({ method: 'GET', url: '/student/getMenu' }),
      transformResponse: (response: IApiEnvelope<IMenu | IMenu[] | null>) => {
        if (Array.isArray(response.data)) return response.data[0] ?? null;
        return response.data ?? null;
      },
      providesTags: ['Menu'],
    }),
    getAdminMenu: builder.query<IMenu | null, void>({
      query: () => ({ method: 'GET', url: '/admin/getMenu' }),
      transformResponse: (response: IApiEnvelope<IMenu | null>) => response.data ?? null,
      providesTags: ['Menu'],
    }),
    uploadMenu: builder.mutation<IMenu, IMenuPayload>({
      query: (body) => ({ method: 'POST', url: '/admin/menu_upload', body }),
      transformResponse: (response: IApiEnvelope<IMenu>) => response.data,
      invalidatesTags: ['Menu'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateMenu: builder.mutation<IMenu, { id: string; body: IMenuPayload }>({
      query: ({ id, body }) => ({ method: 'PUT', url: `/admin/menu/${id}`, body }),
      transformResponse: (response: IApiEnvelope<IMenu>) => response.data,
      invalidatesTags: ['Menu'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const {
  useGetStudentMenuQuery,
  useGetAdminMenuQuery,
  useUploadMenuMutation,
  useUpdateMenuMutation,
} = MenuApi;
