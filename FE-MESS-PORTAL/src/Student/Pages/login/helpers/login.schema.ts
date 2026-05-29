import * as yup from 'yup';
import { PASSWORD_MIN_LENGTH, STUDENT_EMAIL_REGEX } from 'Common/constants/auth.constants';
import type { ILoginFormValues } from '../constants/login.interfaces';

export const LOGIN_SCHEMA: yup.ObjectSchema<ILoginFormValues> = yup.object({
  emailId: yup
    .string()
    .required('Email is required')
    .matches(STUDENT_EMAIL_REGEX, 'Please use your institute email (e.g. name_2101cs01@iitp.ac.in)'),
  password: yup
    .string()
    .required('Password is required')
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
});

export const LOGIN_DEFAULT_VALUES: ILoginFormValues = { emailId: '', password: '' };
