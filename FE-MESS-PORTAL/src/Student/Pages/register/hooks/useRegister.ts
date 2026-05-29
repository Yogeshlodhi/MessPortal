import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { useStudentRegisterMutation } from 'Redux/Slices/Common/AuthApi';
import { setAuthUser } from 'Redux/Slices/Common/AuthSlice';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';
import { ROUTE } from 'Common/constants/routes.constants';

import type { IRegisterFormValues } from '../constants/register.interfaces';
import { REGISTER_DEFAULT_VALUES, REGISTER_SCHEMA } from '../helpers/register.schema';
import { REGISTER_SUCCESS_MESSAGE } from '../constants/register.general';

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerMutation, { isLoading }] = useStudentRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(REGISTER_SCHEMA),
    defaultValues: REGISTER_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const student = await registerMutation(values).unwrap();
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
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: REGISTER_SUCCESS_MESSAGE }),
      );
      navigate(ROUTE.STUDENT_DASHBOARD, { replace: true });
    } catch {
      // error toast handled centrally
    }
  });

  return { control, errors, isLoading, onSubmit };
};
