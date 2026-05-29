import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'Axios/AxiosInterceptor';
import { onQueryStartedErrorToast } from 'Utils/Common/rtkQueryErrorHandler';
import type { IApiEnvelope } from 'Common/types/api.types';
import type { IAnnouncement, IAnnouncementPayload } from 'Common/types/domain.types';

export const AnnouncementApi = createApi({
  reducerPath: 'announcementApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Announcement'],
  endpoints: (builder) => ({
    getStudentAnnouncements: builder.query<IAnnouncement[], void>({
      query: () => ({ method: 'GET', url: '/student/announcements' }),
      transformResponse: (response: IApiEnvelope<IAnnouncement[]>) => response.data ?? [],
      providesTags: ['Announcement'],
    }),
    getAdminAnnouncements: builder.query<IAnnouncement[], void>({
      query: () => ({ method: 'GET', url: '/admin/announcement' }),
      transformResponse: (response: IApiEnvelope<IAnnouncement[]>) => response.data ?? [],
      providesTags: ['Announcement'],
    }),
    addAnnouncement: builder.mutation<IAnnouncement, IAnnouncementPayload>({
      query: (body) => ({ method: 'POST', url: '/admin/announcement', body }),
      transformResponse: (response: IApiEnvelope<IAnnouncement>) => response.data,
      invalidatesTags: ['Announcement'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    deleteAnnouncement: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ method: 'DELETE', url: `/admin/announcement/${id}` }),
      invalidatesTags: ['Announcement'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const {
  useGetStudentAnnouncementsQuery,
  useGetAdminAnnouncementsQuery,
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = AnnouncementApi;
