import * as yup from 'yup';
import { optionalImageSchema } from 'Utils/Common/imageValidation';
import { RATING_MAX, RATING_MIN } from '../constants/feedback.general';
import type { IFeedbackFormValues } from '../constants/feedback.interfaces';

export const FEEDBACK_SCHEMA: yup.ObjectSchema<IFeedbackFormValues> = yup.object({
  feedback: yup
    .number()
    .typeError('Rating is required')
    .required('Rating is required')
    .min(RATING_MIN, `Rating must be between ${RATING_MIN} and ${RATING_MAX}`)
    .max(RATING_MAX, `Rating must be between ${RATING_MIN} and ${RATING_MAX}`),
  feedbackDescription: yup.string().required('Description is required').trim(),
  suggestion: yup.string().optional().default(''),
  mealOfDay: yup
    .mixed<'Breakfast' | 'Lunch' | 'Dinner' | ''>()
    .required('Meal selection is required')
    .oneOf(['Breakfast', 'Lunch', 'Dinner'], 'Select a meal'),
  feedbackImage: optionalImageSchema(),
});

export const FEEDBACK_DEFAULT_VALUES: IFeedbackFormValues = {
  feedback: 5,
  feedbackDescription: '',
  suggestion: '',
  mealOfDay: '',
  feedbackImage: null,
};
