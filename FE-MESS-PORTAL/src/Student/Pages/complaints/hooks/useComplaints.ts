import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRaiseComplaintMutation } from 'Redux/Slices/Common/ComplaintApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { IComplaintFormValues } from '../constants/complaints.interfaces';
import { COMPLAINT_DEFAULT_VALUES, COMPLAINT_SCHEMA } from '../helpers/complaints.schema';
import { COMPLAINT_SUCCESS_MESSAGE } from '../constants/complaints.general';

export const useComplaints = () => {
  const dispatch = useAppDispatch();
  const [raiseComplaint, { isLoading }] = useRaiseComplaintMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IComplaintFormValues>({
    resolver: yupResolver(COMPLAINT_SCHEMA),
    defaultValues: COMPLAINT_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await raiseComplaint({
        complaintAbout: values.complaintAbout,
        description: values.description,
        ...(values.attachment ? { attachment: values.attachment } : {}),
      }).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: COMPLAINT_SUCCESS_MESSAGE }),
      );
      reset(COMPLAINT_DEFAULT_VALUES);
    } catch {
      // error toast handled centrally
    }
  });

  return { control, errors, isLoading, onSubmit };
};
