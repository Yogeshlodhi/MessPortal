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
  ILeave,
  ILeaveActionPayload,
  ILeavePayload,
  LeaveStatus,
} from 'Common/types/domain.types';

export type ILeaveListQuery = IListQuery & { status?: LeaveStatus };

export const LeaveApi = createApi({
  reducerPath: 'leaveApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Leave', 'TodayLeave'],
  endpoints: (builder) => ({
    applyLeave: builder.mutation<ILeave, ILeavePayload>({
      query: (body) => ({ method: 'POST', url: '/student/leaveApplication', body }),
      transformResponse: (response: IApiEnvelope<ILeave>) => response.data,
      invalidatesTags: ['Leave', 'TodayLeave'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getMyLeaves: builder.query<ILeave[], void>({
      query: () => ({ method: 'GET', url: '/student/leaves' }),
      transformResponse: (response: IApiEnvelope<ILeave[]>) => response.data ?? [],
      providesTags: ['Leave'],
    }),
    getAllLeaves: builder.query<IPaginatedResult<ILeave>, ILeaveListQuery | void>({
      query: (params) => ({
        method: 'GET',
        url: '/admin/leaves_list',
        params: buildListParams(params ?? {}),
      }),
      transformResponse: (response: IPaginatedEnvelope<ILeave>) => ({
        items: response.data ?? [],
        pagination: response.pagination ?? EMPTY_PAGINATION,
      }),
      providesTags: ['Leave'],
    }),
    getTodayLeaves: builder.query<ILeave[], void>({
      query: () => ({ method: 'GET', url: '/admin/filtered_leaves' }),
      transformResponse: (response: IApiEnvelope<ILeave[]>) => response.data ?? [],
      providesTags: ['TodayLeave'],
    }),
    leaveAction: builder.mutation<ILeave, { id: string; body: ILeaveActionPayload }>({
      query: ({ id, body }) => ({ method: 'PUT', url: `/admin/leaves/takeAction/${id}`, body }),
      transformResponse: (response: IApiEnvelope<ILeave>) => response.data,
      invalidatesTags: ['Leave', 'TodayLeave'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const {
  useApplyLeaveMutation,
  useGetMyLeavesQuery,
  useGetAllLeavesQuery,
  useGetTodayLeavesQuery,
  useLeaveActionMutation,
} = LeaveApi;
