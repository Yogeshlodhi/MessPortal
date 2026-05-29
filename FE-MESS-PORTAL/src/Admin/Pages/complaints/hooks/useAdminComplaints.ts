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

export const useAdminComplaints = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, refetch } = useGetComplaintsQuery();
  const [complaintAction, { isLoading: isActioning }] = useComplaintActionMutation();
  const [deleteComplaint, { isLoading: isDeleting }] = useDeleteComplaintMutation();

  const handleAction = async (id: string, status: Exclude<ComplaintStatus, 'Pending'>) => {
    try {
      await complaintAction({ id, body: { status } }).unwrap();
      dispatch(showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: COMPLAINTS_SUCCESS_ACTION }));
    } catch {
      // error toast handled centrally
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComplaint(id).unwrap();
      dispatch(showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: COMPLAINTS_SUCCESS_DELETE }));
    } catch {
      // error toast handled centrally
    }
  };

  return { complaints: data, isLoading, error, refetch, handleAction, handleDelete, isActioning, isDeleting };
};
