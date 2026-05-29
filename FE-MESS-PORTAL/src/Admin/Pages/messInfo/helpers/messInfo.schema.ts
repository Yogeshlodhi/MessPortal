import * as yup from 'yup';
import type { IContactFormValues, IMessInfoFormValues } from '../constants/messInfo.interfaces';

export const MESS_INFO_SCHEMA: yup.ObjectSchema<IMessInfoFormValues> = yup.object({
  mealPrice: yup
    .number()
    .typeError('Meal price must be a number')
    .required('Meal price is required')
    .min(0),
  messOwner: yup.string().required('Mess owner is required').trim(),
  contractInfo: yup.string().required('Contract info is required').trim(),
  tenureStarts: yup.string().required('Tenure start is required'),
  tenureEnds: yup.string().required('Tenure end is required'),
});

export const MESS_INFO_DEFAULTS: IMessInfoFormValues = {
  mealPrice: 0,
  messOwner: '',
  contractInfo: '',
  tenureStarts: '',
  tenureEnds: '',
};

export const CONTACT_SCHEMA: yup.ObjectSchema<IContactFormValues> = yup.object({
  role: yup.string().required('Role is required').trim(),
  contactNo: yup.string().required('Contact number is required').trim(),
  emailId: yup.string().required('Email is required').email('Enter a valid email'),
});

export const CONTACT_DEFAULTS: IContactFormValues = { role: '', contactNo: '', emailId: '' };
