import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'Axios/AxiosInterceptor';
import { onQueryStartedErrorToast } from 'Utils/Common/rtkQueryErrorHandler';
import { IApiEnvelope } from 'Common/types/api.types';
import type {
  IAdminLoginPayload,
  IAdminRecord,
  IStudentLoginPayload,
  IStudentRecord,
  IStudentRegisterPayload,
} from 'Common/types/auth.types';

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    studentLogin: builder.mutation<IStudentRecord, IStudentLoginPayload>({
      query: (body) => ({ method: 'POST', url: '/student/login', body }),
      transformResponse: (response: IApiEnvelope<IStudentRecord>) => response.data,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    studentRegister: builder.mutation<IStudentRecord, IStudentRegisterPayload>({
      query: (body) => ({ method: 'POST', url: '/student', body }),
      transformResponse: (response: IApiEnvelope<IStudentRecord>) => response.data,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    studentLogout: builder.mutation<{ success: boolean }, void>({
      query: () => ({ method: 'GET', url: '/student/logout' }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    studentProfile: builder.query<IStudentRecord, void>({
      query: () => ({ method: 'GET', url: '/student' }),
      transformResponse: (response: IApiEnvelope<IStudentRecord>) => response.data,
    }),
    adminLogin: builder.mutation<IAdminRecord, IAdminLoginPayload>({
      query: (body) => ({ method: 'POST', url: '/admin/login', body }),
      transformResponse: (response: IApiEnvelope<IAdminRecord>) => response.data,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    adminLogout: builder.mutation<{ success: boolean }, void>({
      query: () => ({ method: 'GET', url: '/admin/logout' }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const {
  useStudentLoginMutation,
  useStudentRegisterMutation,
  useStudentLogoutMutation,
  useStudentProfileQuery,
  useAdminLoginMutation,
  useAdminLogoutMutation,
} = AuthApi;
