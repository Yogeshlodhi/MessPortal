import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { useAdminLoginMutation } from 'Redux/Slices/Common/AuthApi';
import { setAuthUser } from 'Redux/Slices/Common/AuthSlice';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';
import { ROUTE } from 'Common/constants/routes.constants';

import type { IAdminLoginFormValues } from '../constants/login.interfaces';
import { ADMIN_LOGIN_DEFAULT_VALUES, ADMIN_LOGIN_SCHEMA } from '../helpers/login.schema';
import {
  ADMIN_LOGIN_GUEST_EMAIL,
  ADMIN_LOGIN_GUEST_FILLED_MESSAGE,
  ADMIN_LOGIN_GUEST_PASSWORD,
  ADMIN_LOGIN_SUCCESS_MESSAGE,
} from '../constants/login.general';

export const useAdminLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginMutation, { isLoading }] = useAdminLoginMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAdminLoginFormValues>({
    resolver: yupResolver(ADMIN_LOGIN_SCHEMA),
    defaultValues: ADMIN_LOGIN_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const fillGuestCredentials = () => {
    setValue('emailId', ADMIN_LOGIN_GUEST_EMAIL, { shouldValidate: true });
    setValue('password', ADMIN_LOGIN_GUEST_PASSWORD, { shouldValidate: true });
    dispatch(
      showSnackbar({ severity: SNACKBAR_SEVERITY.INFO, message: ADMIN_LOGIN_GUEST_FILLED_MESSAGE }),
    );
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const admin = await loginMutation(values).unwrap();
      const displayName = [admin.firstName, admin.lastName].filter(Boolean).join(' ').trim();
      dispatch(
        setAuthUser({
          id: admin._id,
          emailId: admin.emailId,
          displayName: displayName || admin.firstName,
          role: admin.adminType,
        }),
      );
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: ADMIN_LOGIN_SUCCESS_MESSAGE }),
      );
      navigate(ROUTE.ADMIN_DASHBOARD, { replace: true });
    } catch {
      // error toast handled centrally
    }
  });

  return { control, errors, isLoading, onSubmit, fillGuestCredentials };
};
