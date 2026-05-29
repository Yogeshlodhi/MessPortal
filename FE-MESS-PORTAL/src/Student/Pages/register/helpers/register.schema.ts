import * as yup from 'yup';
import {
  PASSWORD_MIN_LENGTH,
  PHONE_REGEX,
  STUDENT_EMAIL_REGEX,
  STUDENT_NAME_MAX_LENGTH,
  STUDENT_NAME_MIN_LENGTH,
  STUDENT_ROLL_REGEX,
} from 'Common/constants/auth.constants';
import type { IRegisterFormValues } from '../constants/register.interfaces';

export const REGISTER_SCHEMA: yup.ObjectSchema<IRegisterFormValues> = yup.object({
  studentName: yup
    .string()
    .required('Name is required')
    .trim()
    .min(STUDENT_NAME_MIN_LENGTH, `Name must be at least ${STUDENT_NAME_MIN_LENGTH} characters`)
    .max(STUDENT_NAME_MAX_LENGTH, `Name cannot exceed ${STUDENT_NAME_MAX_LENGTH} characters`),
  emailId: yup
    .string()
    .required('Email is required')
    .matches(STUDENT_EMAIL_REGEX, 'Use your institute email (e.g. name_2101cs01@iitp.ac.in)'),
  studentRoll: yup
    .string()
    .required('Roll number is required')
    .matches(STUDENT_ROLL_REGEX, 'Roll number must match the format 2101CS01'),
  number: yup
    .string()
    .required('Phone number is required')
    .matches(PHONE_REGEX, 'Phone number must be exactly 10 digits'),
  password: yup
    .string()
    .required('Password is required')
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
});

export const REGISTER_DEFAULT_VALUES: IRegisterFormValues = {
  studentName: '',
  emailId: '',
  studentRoll: '',
  number: '',
  password: '',
};
