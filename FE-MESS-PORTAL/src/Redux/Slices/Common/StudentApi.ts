import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'Axios/AxiosInterceptor';
import { onQueryStartedErrorToast } from 'Utils/Common/rtkQueryErrorHandler';
import { buildListParams } from 'Utils/Common/listParams';
import {
  EMPTY_PAGINATION,
  type IApiEnvelope,
  type IListQuery,
  type IPaginatedEnvelope,
  type IPaginatedResult,
} from 'Common/types/api.types';
import type {
  IAddAdminPayload,
  IAdminDashboardStats,
  IStudentListRow,
} from 'Common/types/domain.types';
import type { IAdminRecord, IStudentRecord } from 'Common/types/auth.types';
import type { IUpdateStudentProfilePayload } from 'Common/types/domain.types';

export const StudentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: customBaseQuery,
  tagTypes: ['StudentProfile', 'StudentList', 'AdminStats'],
  endpoints: (builder) => ({
    getStudentProfile: builder.query<IStudentRecord, void>({
      query: () => ({ method: 'GET', url: '/student' }),
      transformResponse: (response: IApiEnvelope<IStudentRecord>) => response.data,
      providesTags: ['StudentProfile'],
    }),
    updateStudentProfile: builder.mutation<IStudentRecord, IUpdateStudentProfilePayload>({
      query: (body) => ({ method: 'PUT', url: '/student', body }),
      transformResponse: (response: IApiEnvelope<IStudentRecord>) => response.data,
      invalidatesTags: ['StudentProfile'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getAllStudents: builder.query<IPaginatedResult<IStudentListRow>, IListQuery | void>({
      query: (params) => ({
        method: 'GET',
        url: '/admin/students_list',
        params: buildListParams(params ?? {}),
      }),
      transformResponse: (response: IPaginatedEnvelope<IStudentListRow>) => ({
        items: response.data ?? [],
        pagination: response.pagination ?? EMPTY_PAGINATION,
      }),
      providesTags: ['StudentList'],
    }),
    getAdminStats: builder.query<IAdminDashboardStats, void>({
      query: () => ({ method: 'GET', url: '/admin/stats' }),
      transformResponse: (response: IApiEnvelope<IAdminDashboardStats>) => response.data,
      providesTags: ['AdminStats'],
    }),
    addAdmin: builder.mutation<IAdminRecord, IAddAdminPayload>({
      query: (body) => ({ method: 'POST', url: '/admin/addAdmin', body }),
      transformResponse: (response: IApiEnvelope<IAdminRecord>) => response.data,
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const {
  useGetStudentProfileQuery,
  useUpdateStudentProfileMutation,
  useGetAllStudentsQuery,
  useLazyGetAllStudentsQuery,
  useGetAdminStatsQuery,
  useAddAdminMutation,
} = StudentApi;
