import * as yup from 'yup';
import type { IMenuPayload } from 'Common/types/domain.types';
import { DAY_KEYS_ORDER } from '../constants/menu.general';

const dailySchema = yup.object({
  breakfast: yup.string().required('Breakfast is required'),
  lunch: yup.string().required('Lunch is required'),
  dinner: yup.string().required('Dinner is required'),
  extras: yup.string().optional().default(''),
});

const weeklyMenuShape = DAY_KEYS_ORDER.reduce<Record<string, typeof dailySchema>>((acc, day) => {
  acc[day] = dailySchema;
  return acc;
}, {});

export const MENU_SCHEMA: yup.ObjectSchema<IMenuPayload> = yup.object({
  remarks: yup.string().optional().default(''),
  timing: yup.object({
    breakfast: yup.string().required('Breakfast timing is required'),
    lunch: yup.string().required('Lunch timing is required'),
    dinner: yup.string().required('Dinner timing is required'),
    specialTiming: yup.string().optional().default(''),
  }),
  weeklyMenu: yup.object(weeklyMenuShape),
}) as unknown as yup.ObjectSchema<IMenuPayload>;

const blankDaily = { breakfast: '', lunch: '', dinner: '', extras: '' };

export const MENU_DEFAULT_VALUES: IMenuPayload = {
  remarks: '',
  timing: { breakfast: '', lunch: '', dinner: '', specialTiming: '' },
  weeklyMenu: {
    monday: { ...blankDaily },
    tuesday: { ...blankDaily },
    wednesday: { ...blankDaily },
    thursday: { ...blankDaily },
    friday: { ...blankDaily },
    saturday: { ...blankDaily },
    sunday: { ...blankDaily },
  },
};
