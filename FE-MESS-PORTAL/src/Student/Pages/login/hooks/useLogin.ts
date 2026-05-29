import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { useStudentLoginMutation } from 'Redux/Slices/Common/AuthApi';
import { setAuthUser } from 'Redux/Slices/Common/AuthSlice';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';
import { ROUTE } from 'Common/constants/routes.constants';

import type { ILoginFormValues } from '../constants/login.interfaces';
import { LOGIN_DEFAULT_VALUES, LOGIN_SCHEMA } from '../helpers/login.schema';
import { LOGIN_SUCCESS_MESSAGE } from '../constants/login.general';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginMutation, { isLoading }] = useStudentLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(LOGIN_SCHEMA),
    defaultValues: LOGIN_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const student = await loginMutation(values).unwrap();
      dispatch(
        setAuthUser({
          id: student._id,
          emailId: student.emailId,
          displayName: student.studentName,
          role: 'Student',
          avatarUrl: student.avatar?.url ?? student.profileImage,
        }),
      );
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: LOGIN_SUCCESS_MESSAGE }),
      );
      navigate(ROUTE.STUDENT_DASHBOARD, { replace: true });
    } catch {
      // error toast handled centrally
    }
  });

  return { control, errors, isLoading, onSubmit };
};
