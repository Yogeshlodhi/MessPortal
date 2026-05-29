import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'Axios/AxiosInterceptor';
import { onQueryStartedErrorToast } from 'Utils/Common/rtkQueryErrorHandler';
import type { IApiEnvelope } from 'Common/types/api.types';
import type { IAddAdminPayload, IStudentListRow } from 'Common/types/domain.types';
import type {
  IAdminRecord,
  IStudentRecord,
} from 'Common/types/auth.types';
import type { IUpdateStudentProfilePayload } from 'Common/types/domain.types';

export const StudentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: customBaseQuery,
  tagTypes: ['StudentProfile', 'StudentList'],
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
    getAllStudents: builder.query<IStudentListRow[], void>({
      query: () => ({ method: 'GET', url: '/admin/students_list' }),
      transformResponse: (response: IApiEnvelope<IStudentListRow[]>) => response.data ?? [],
      providesTags: ['StudentList'],
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
  useAddAdminMutation,
} = StudentApi;
