import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'Axios/AxiosInterceptor';
import { onQueryStartedErrorToast } from 'Utils/Common/rtkQueryErrorHandler';
import type { IApiEnvelope } from 'Common/types/api.types';
import type {
  IComplaint,
  IComplaintActionPayload,
  IComplaintPayload,
} from 'Common/types/domain.types';
import { buildMultipartBody } from 'Utils/Common/multipart';

type RaiseComplaintArg = IComplaintPayload & { attachment?: File | null };

export const ComplaintApi = createApi({
  reducerPath: 'complaintApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Complaint'],
  endpoints: (builder) => ({
    raiseComplaint: builder.mutation<IComplaint, RaiseComplaintArg>({
      query: ({ attachment, ...fields }) => {
        // Send multipart only when a file is attached; otherwise keep JSON.
        if (attachment) {
          return {
            method: 'POST',
            url: '/student/raise_complaint',
            body: buildMultipartBody(fields, { attachment }),
            headers: { 'Content-Type': 'multipart/form-data' },
          };
        }
        return { method: 'POST', url: '/student/raise_complaint', body: fields };
      },
      transformResponse: (response: IApiEnvelope<IComplaint>) => response.data,
      invalidatesTags: ['Complaint'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getComplaints: builder.query<IComplaint[], void>({
      query: () => ({ method: 'GET', url: '/admin/getComplaints' }),
      transformResponse: (response: IApiEnvelope<IComplaint[]>) => response.data ?? [],
      providesTags: ['Complaint'],
    }),
    getComplaint: builder.query<IComplaint, string>({
      query: (id) => ({ method: 'GET', url: `/admin/complaints/${id}` }),
      transformResponse: (response: IApiEnvelope<IComplaint>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Complaint', id }],
    }),
    complaintAction: builder.mutation<IComplaint, { id: string; body: IComplaintActionPayload }>({
      query: ({ id, body }) => ({ method: 'PUT', url: `/admin/complaint/takeAction/${id}`, body }),
      transformResponse: (response: IApiEnvelope<IComplaint>) => response.data,
      invalidatesTags: ['Complaint'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    deleteComplaint: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ method: 'DELETE', url: `/admin/complaints/${id}` }),
      invalidatesTags: ['Complaint'],
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const {
  useRaiseComplaintMutation,
  useGetComplaintsQuery,
  useGetComplaintQuery,
  useComplaintActionMutation,
  useDeleteComplaintMutation,
} = ComplaintApi;
