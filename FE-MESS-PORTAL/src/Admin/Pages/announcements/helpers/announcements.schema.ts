import * as yup from 'yup';
import type { IAnnouncementFormValues } from '../constants/announcements.interfaces';

export const ANNOUNCEMENT_SCHEMA: yup.ObjectSchema<IAnnouncementFormValues> = yup.object({
  heading: yup.string().required('Heading is required').trim().max(160),
  description: yup.string().required('Description is required').trim(),
});

export const ANNOUNCEMENT_DEFAULT_VALUES: IAnnouncementFormValues = {
  heading: '',
  description: '',
};
