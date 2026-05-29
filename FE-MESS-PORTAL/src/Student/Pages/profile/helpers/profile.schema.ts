import * as yup from 'yup';
import {
  PHONE_REGEX,
  STUDENT_NAME_MAX_LENGTH,
  STUDENT_NAME_MIN_LENGTH,
} from 'Common/constants/auth.constants';
import type { IProfileFormValues } from '../constants/profile.interfaces';

export const PROFILE_SCHEMA: yup.ObjectSchema<IProfileFormValues> = yup.object({
  studentName: yup
    .string()
    .required('Name is required')
    .trim()
    .min(STUDENT_NAME_MIN_LENGTH, `Name must be at least ${STUDENT_NAME_MIN_LENGTH} characters`)
    .max(STUDENT_NAME_MAX_LENGTH, `Name cannot exceed ${STUDENT_NAME_MAX_LENGTH} characters`),
  number: yup
    .string()
    .required('Phone number is required')
    .matches(PHONE_REGEX, 'Phone number must be exactly 10 digits'),
  bankAccount: yup.string().optional().default(''),
  ifsc: yup.string().optional().default(''),
});
