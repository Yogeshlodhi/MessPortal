import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  useGetAdminMenuQuery,
  useUpdateMenuMutation,
  useUploadMenuMutation,
} from 'Redux/Slices/Common/MenuApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { IMenuFormValues } from '../constants/menu.interfaces';
import { MENU_DEFAULT_VALUES, MENU_SCHEMA } from '../helpers/menu.schema';
import {
  ADMIN_MENU_SUCCESS_CREATE,
  ADMIN_MENU_SUCCESS_UPDATE,
} from '../constants/menu.general';

export const useMenuEditor = () => {
  const dispatch = useAppDispatch();
  const { data: menu, isLoading, error, refetch } = useGetAdminMenuQuery();
  const [uploadMenu, { isLoading: isUploading }] = useUploadMenuMutation();
  const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuMutation();
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMenuFormValues>({
    resolver: yupResolver(MENU_SCHEMA),
    defaultValues: MENU_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  useEffect(() => {
    if (menu) {
      reset({
        remarks: menu.remarks ?? '',
        timing: {
          breakfast: menu.timing?.breakfast ?? '',
          lunch: menu.timing?.lunch ?? '',
          dinner: menu.timing?.dinner ?? '',
          specialTiming: menu.timing?.specialTiming ?? '',
        },
        weeklyMenu: menu.weeklyMenu ?? MENU_DEFAULT_VALUES.weeklyMenu,
      });
    } else {
      reset(MENU_DEFAULT_VALUES);
    }
  }, [menu, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (menu?._id) {
        await updateMenu({ id: menu._id, body: values }).unwrap();
        dispatch(
          showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: ADMIN_MENU_SUCCESS_UPDATE }),
        );
      } else {
        await uploadMenu(values).unwrap();
        dispatch(
          showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: ADMIN_MENU_SUCCESS_CREATE }),
        );
      }
      setIsEditing(false);
    } catch {
      // error toast handled centrally
    }
  });

  return {
    menu,
    isLoading,
    error,
    refetch,
    isEditing,
    setIsEditing,
    control,
    errors,
    onSubmit,
    isSaving: isUploading || isUpdating,
  };
};
