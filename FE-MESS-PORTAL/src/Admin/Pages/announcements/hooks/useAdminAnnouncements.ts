import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useGetAdminAnnouncementsQuery,
} from 'Redux/Slices/Common/AnnouncementApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { IAnnouncementFormValues } from '../constants/announcements.interfaces';
import {
  ANNOUNCEMENT_DEFAULT_VALUES,
  ANNOUNCEMENT_SCHEMA,
} from '../helpers/announcements.schema';
import {
  ANNOUNCEMENT_SUCCESS_ADD,
  ANNOUNCEMENT_SUCCESS_DELETE,
} from '../constants/announcements.general';

export const useAdminAnnouncements = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, refetch } = useGetAdminAnnouncementsQuery();
  const [addAnnouncement, { isLoading: isAdding }] = useAddAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAnnouncementFormValues>({
    resolver: yupResolver(ANNOUNCEMENT_SCHEMA),
    defaultValues: ANNOUNCEMENT_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await addAnnouncement(values).unwrap();
      dispatch(showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: ANNOUNCEMENT_SUCCESS_ADD }));
      reset(ANNOUNCEMENT_DEFAULT_VALUES);
    } catch {
      // error toast handled centrally
    }
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteAnnouncement(id).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: ANNOUNCEMENT_SUCCESS_DELETE }),
      );
    } catch {
      // error toast handled centrally
    }
  };

  return {
    announcements: data,
    isLoading,
    error,
    refetch,
    control,
    errors,
    onSubmit,
    isAdding,
    handleDelete,
  };
};
