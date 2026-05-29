import { useState } from 'react';

import {
  useComplaintActionMutation,
  useDeleteComplaintMutation,
  useGetComplaintsQuery,
} from 'Redux/Slices/Common/ComplaintApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { ComplaintStatus } from 'Common/types/domain.types';
import {
  COMPLAINTS_SUCCESS_ACTION,
  COMPLAINTS_SUCCESS_DELETE,
} from '../constants/complaints.general';

const PAGE_SIZE = 10;

export const useAdminComplaints = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1); // 1-based for MUI Pagination
  const [status, setStatusValue] = useState<'' | ComplaintStatus>('');

  const { data, isLoading, isFetching, error, refetch } = useGetComplaintsQuery({
    page,
    limit: PAGE_SIZE,
    sortBy: 'createdAt',
    order: 'desc',
    status: status || undefined,
  });

  const [complaintAction, { isLoading: isActioning }] = useComplaintActionMutation();
  const [deleteComplaint, { isLoading: isDeleting }] = useDeleteComplaintMutation();

  const setStatus = (value: string) => {
    setStatusValue(value as '' | ComplaintStatus);
    setPage(1);
  };

  const handleAction = async (id: string, next: Exclude<ComplaintStatus, 'Pending'>) => {
    try {
      await complaintAction({ id, body: { status: next } }).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: COMPLAINTS_SUCCESS_ACTION }),
      );
    } catch {
      // error toast handled centrally
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComplaint(id).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: COMPLAINTS_SUCCESS_DELETE }),
      );
    } catch {
      // error toast handled centrally
    }
  };

  return {
    complaints: data?.items ?? [],
    total: data?.pagination.total ?? 0,
    totalPages: data?.pagination.totalPages ?? 1,
    page,
    setPage,
    status,
    setStatus,
    isFiltered: Boolean(status),
    isLoading,
    isFetching,
    error,
    refetch,
    handleAction,
    handleDelete,
    isActioning,
    isDeleting,
  };
};
