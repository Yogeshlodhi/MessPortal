import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useApplyLeaveMutation } from 'Redux/Slices/Common/LeaveApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { ILeaveFormValues } from '../constants/leaveApplication.interfaces';
import { LEAVE_DEFAULT_VALUES, LEAVE_SCHEMA } from '../helpers/leaveApplication.schema';
import { LEAVE_APPLY_SUCCESS } from '../constants/leaveApplication.general';

export const useLeaveApplication = () => {
  const dispatch = useAppDispatch();
  const [applyLeave, { isLoading: isSubmitting }] = useApplyLeaveMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILeaveFormValues>({
    resolver: yupResolver(LEAVE_SCHEMA),
    defaultValues: LEAVE_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await applyLeave(values).unwrap();
      dispatch(showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: LEAVE_APPLY_SUCCESS }));
      reset(LEAVE_DEFAULT_VALUES);
    } catch {
      // error toast handled centrally
    }
  });

  return {
    control,
    errors,
    isSubmitting,
    onSubmit,
  };
};
