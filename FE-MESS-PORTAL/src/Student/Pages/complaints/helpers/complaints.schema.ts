import * as yup from 'yup';
import { optionalImageSchema } from 'Utils/Common/imageValidation';
import type { IComplaintFormValues } from '../constants/complaints.interfaces';

export const COMPLAINT_SCHEMA: yup.ObjectSchema<IComplaintFormValues> = yup.object({
  complaintAbout: yup.string().required('Subject is required').trim().min(2).max(120),
  description: yup.string().required('Description is required').trim(),
  attachment: optionalImageSchema(),
});

export const COMPLAINT_DEFAULT_VALUES: IComplaintFormValues = {
  complaintAbout: '',
  description: '',
  attachment: null,
};
