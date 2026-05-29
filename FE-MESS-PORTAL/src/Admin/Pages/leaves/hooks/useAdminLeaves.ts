import { useState } from 'react';

import { useGetAllLeavesQuery, useLeaveActionMutation } from 'Redux/Slices/Common/LeaveApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';
import type { LeaveStatus } from 'Common/types/domain.types';

import { LEAVES_APPROVED_MESSAGE, LEAVES_REJECTED_MESSAGE } from '../constants/leaves.general';

const PAGE_SIZE = 10;

export const useAdminLeaves = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1); // 1-based for MUI Pagination
  const [status, setStatusValue] = useState<'' | LeaveStatus>('');

  const { data, isLoading, isFetching, error, refetch } = useGetAllLeavesQuery({
    page,
    limit: PAGE_SIZE,
    sortBy: 'appliedDate',
    order: 'desc',
    status: status || undefined,
  });

  const [leaveAction, { isLoading: isActioning }] = useLeaveActionMutation();

  const setStatus = (value: string) => {
    setStatusValue(value as '' | LeaveStatus);
    setPage(1);
  };

  const approve = async (id: string) => {
    try {
      await leaveAction({ id, body: { status: 'Approved' } }).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: LEAVES_APPROVED_MESSAGE }),
      );
    } catch {
      // error toast handled centrally
    }
  };

  const reject = async (id: string) => {
    try {
      await leaveAction({ id, body: { status: 'Rejected' } }).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: LEAVES_REJECTED_MESSAGE }),
      );
    } catch {
      // error toast handled centrally
    }
  };

  return {
    leaves: data?.items ?? [],
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
    approve,
    reject,
    isActioning,
  };
};
