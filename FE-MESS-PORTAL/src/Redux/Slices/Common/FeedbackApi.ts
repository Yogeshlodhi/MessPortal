import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'Axios/AxiosInterceptor';
import { onQueryStartedErrorToast } from 'Utils/Common/rtkQueryErrorHandler';
import type { IApiEnvelope } from 'Common/types/api.types';
import type { IFeedback, IFeedbackPayload } from 'Common/types/domain.types';
import { buildMultipartBody } from 'Utils/Common/multipart';

type SubmitFeedbackArg = IFeedbackPayload & { feedbackImage?: File | null };

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
    getFeedbacks: builder.query<IFeedback[], void>({
      query: () => ({ method: 'GET', url: '/admin/feedback_list' }),
      transformResponse: (response: IApiEnvelope<IFeedback[]>) => response.data ?? [],
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
