import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  useAddMessInfoContactMutation,
  useAddMessInfoMutation,
  useGetAdminMessInfoQuery,
  useUpdateMessInfoMutation,
} from 'Redux/Slices/Common/MessInfoApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { IContactFormValues, IMessInfoFormValues } from '../constants/messInfo.interfaces';
import {
  CONTACT_DEFAULTS,
  CONTACT_SCHEMA,
  MESS_INFO_DEFAULTS,
  MESS_INFO_SCHEMA,
} from '../helpers/messInfo.schema';
import {
  MESS_INFO_SUCCESS_CONTACT,
  MESS_INFO_SUCCESS_CREATE,
  MESS_INFO_SUCCESS_UPDATE,
} from '../constants/messInfo.general';

export const useMessInfoEditor = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, refetch } = useGetAdminMessInfoQuery();
  const [addMessInfo, { isLoading: isCreating }] = useAddMessInfoMutation();
  const [updateMessInfo, { isLoading: isUpdating }] = useUpdateMessInfoMutation();
  const [addContact, { isLoading: isAddingContact }] = useAddMessInfoContactMutation();
  const [isEditing, setIsEditing] = useState(false);

  const infoForm = useForm<IMessInfoFormValues>({
    resolver: yupResolver(MESS_INFO_SCHEMA),
    defaultValues: MESS_INFO_DEFAULTS,
    mode: 'onTouched',
  });

  const contactForm = useForm<IContactFormValues>({
    resolver: yupResolver(CONTACT_SCHEMA),
    defaultValues: CONTACT_DEFAULTS,
    mode: 'onTouched',
  });

  useEffect(() => {
    if (data) {
      infoForm.reset({
        mealPrice: data.mealPrice,
        messOwner: data.messOwner,
        contractInfo: data.contractInfo,
        tenureStarts: data.tenureStarts,
        tenureEnds: data.tenureEnds,
      });
    } else {
      infoForm.reset(MESS_INFO_DEFAULTS);
    }
  }, [data, infoForm]);

  const onSubmitInfo = infoForm.handleSubmit(async (values) => {
    try {
      const payload = { ...values, contacts: data?.contacts ?? [] };
      if (data?._id) {
        await updateMessInfo({ id: data._id, body: payload }).unwrap();
        dispatch(
          showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: MESS_INFO_SUCCESS_UPDATE }),
        );
      } else {
        await addMessInfo(payload).unwrap();
        dispatch(
          showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: MESS_INFO_SUCCESS_CREATE }),
        );
      }
      setIsEditing(false);
    } catch {
      // error toast handled centrally
    }
  });

  const onSubmitContact = contactForm.handleSubmit(async (values) => {
    if (!data?._id) return;
    try {
      await addContact({ id: data._id, body: values }).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: MESS_INFO_SUCCESS_CONTACT }),
      );
      contactForm.reset(CONTACT_DEFAULTS);
    } catch {
      // error toast handled centrally
    }
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    isEditing,
    setIsEditing,
    infoForm,
    onSubmitInfo,
    isSavingInfo: isCreating || isUpdating,
    contactForm,
    onSubmitContact,
    isAddingContact,
  };
};
