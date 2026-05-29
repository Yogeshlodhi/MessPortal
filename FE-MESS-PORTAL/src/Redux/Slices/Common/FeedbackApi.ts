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
import type { IFeedback, IFeedbackPayload, MealOfDay } from 'Common/types/domain.types';
import { buildMultipartBody } from 'Utils/Common/multipart';

type SubmitFeedbackArg = IFeedbackPayload & { feedbackImage?: File | null };
export type IFeedbackListQuery = IListQuery & { mealOfDay?: MealOfDay };

export const FeedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Feedback', 'TodayFeedback'],
  endpoints: (builder) => ({
    submitFeedback: builder.mutation<IFeedback, SubmitFeedbackArg>({
      query: ({ feedbackImage, ...fields }) => {
        // Send multipart only when an image is attached; otherwise keep JSON.
        if (feedbackImage) {
          return {
            method: 'POST',
            url: '/student/submitFeedback',
            body: buildMultipartBody(fields, { feedbackImage }),
            headers: { 'Content-Type': 'multipart/form-data' },
          };
        }
        return { method: 'POST', url: '/student/submitFeedback', body: fields };
      },
      transformResponse: (response: IApiEnvelope<IFeedback>) => response.data,
      invalidatesTags: ['Feedback', 'TodayFeedback'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getFeedbacks: builder.query<IPaginatedResult<IFeedback>, IFeedbackListQuery | void>({
      query: (params) => ({
        method: 'GET',
        url: '/admin/feedback_list',
        params: buildListParams(params ?? {}),
      }),
      transformResponse: (response: IPaginatedEnvelope<IFeedback>) => ({
        items: response.data ?? [],
        pagination: response.pagination ?? EMPTY_PAGINATION,
      }),
      providesTags: ['Feedback'],
    }),
    getTodayFeedbacks: builder.query<IFeedback[], void>({
      query: () => ({ method: 'GET', url: '/admin/filtered_feedbacks' }),
      transformResponse: (response: IApiEnvelope<IFeedback[]>) => response.data ?? [],
      providesTags: ['TodayFeedback'],
    }),
  }),
});

export const { useSubmitFeedbackMutation, useGetFeedbacksQuery, useGetTodayFeedbacksQuery } =
  FeedbackApi;
