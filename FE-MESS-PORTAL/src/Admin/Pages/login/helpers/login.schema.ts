import * as yup from 'yup';
import { PASSWORD_MIN_LENGTH } from 'Common/constants/auth.constants';
import type { IAdminLoginFormValues } from '../constants/login.interfaces';

export const ADMIN_LOGIN_SCHEMA: yup.ObjectSchema<IAdminLoginFormValues> = yup.object({
  emailId: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
});

export const ADMIN_LOGIN_DEFAULT_VALUES: IAdminLoginFormValues = { emailId: '', password: '' };
