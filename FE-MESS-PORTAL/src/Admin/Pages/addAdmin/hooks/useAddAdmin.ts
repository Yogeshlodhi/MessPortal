import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAddAdminMutation } from 'Redux/Slices/Common/StudentApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { IAddAdminFormValues } from '../constants/addAdmin.interfaces';
import { ADD_ADMIN_DEFAULTS, ADD_ADMIN_SCHEMA } from '../helpers/addAdmin.schema';
import { ADD_ADMIN_SUCCESS_MESSAGE } from '../constants/addAdmin.general';

export const useAddAdmin = () => {
  const dispatch = useAppDispatch();
  const [addAdmin, { isLoading }] = useAddAdminMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddAdminFormValues>({
    resolver: yupResolver(ADD_ADMIN_SCHEMA),
    defaultValues: ADD_ADMIN_DEFAULTS,
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await addAdmin({
        firstName: values.firstName,
        emailId: values.emailId,
        password: values.password,
        adminType: values.adminType as Exclude<typeof values.adminType, ''>,
        ...(values.lastName ? { lastName: values.lastName } : {}),
      }).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: ADD_ADMIN_SUCCESS_MESSAGE }),
      );
      reset(ADD_ADMIN_DEFAULTS);
    } catch {
      // error toast handled centrally
    }
  });

  return { control, errors, isLoading, onSubmit };
};
