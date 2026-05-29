import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  useGetStudentProfileQuery,
  useUpdateStudentProfileMutation,
} from 'Redux/Slices/Common/StudentApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { IProfileFormValues } from '../constants/profile.interfaces';
import { PROFILE_SCHEMA } from '../helpers/profile.schema';
import { PROFILE_SUCCESS_MESSAGE } from '../constants/profile.general';

const EMPTY_VALUES: IProfileFormValues = {
  studentName: '',
  number: '',
  bankAccount: '',
  ifsc: '',
};

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, refetch } = useGetStudentProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateStudentProfileMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProfileFormValues>({
    resolver: yupResolver(PROFILE_SCHEMA),
    defaultValues: EMPTY_VALUES,
    mode: 'onTouched',
  });

  useEffect(() => {
    if (!data) return;
    reset({
      studentName: data.studentName,
      number: data.number,
      bankAccount: data.bankAccount ?? '',
      ifsc: data.ifsc ?? '',
    });
  }, [data, reset]);

  const onSubmit = handleSubmit(async (values) => {
    const payload: IProfileFormValues = {
      studentName: values.studentName,
      number: values.number,
      bankAccount: values.bankAccount,
      ifsc: values.ifsc,
    };
    try {
      await updateProfile({
        studentName: payload.studentName,
        number: payload.number,
        ...(payload.bankAccount ? { bankAccount: payload.bankAccount } : {}),
        ...(payload.ifsc ? { ifsc: payload.ifsc } : {}),
      }).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: PROFILE_SUCCESS_MESSAGE }),
      );
    } catch {
      // error toast handled centrally
    }
  });

  return {
    control,
    errors,
    isLoading,
    error,
    refetch,
    isSaving,
    onSubmit,
    profile: data,
  };
};
