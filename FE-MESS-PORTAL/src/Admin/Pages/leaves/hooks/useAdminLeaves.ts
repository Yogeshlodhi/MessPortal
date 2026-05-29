import { useGetAllLeavesQuery, useLeaveActionMutation } from 'Redux/Slices/Common/LeaveApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import { LEAVES_APPROVED_MESSAGE, LEAVES_REJECTED_MESSAGE } from '../constants/leaves.general';

export const useAdminLeaves = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, refetch } = useGetAllLeavesQuery();
  const [leaveAction, { isLoading: isActioning }] = useLeaveActionMutation();

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

  return { leaves: data, isLoading, error, refetch, approve, reject, isActioning };
};
