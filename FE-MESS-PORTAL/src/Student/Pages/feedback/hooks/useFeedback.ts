import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSubmitFeedbackMutation } from 'Redux/Slices/Common/FeedbackApi';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { useAppDispatch } from 'Redux/Store';

import type { IFeedbackFormValues } from '../constants/feedback.interfaces';
import { FEEDBACK_DEFAULT_VALUES, FEEDBACK_SCHEMA } from '../helpers/feedback.schema';
import { FEEDBACK_SUCCESS_MESSAGE } from '../constants/feedback.general';

export const useFeedback = () => {
  const dispatch = useAppDispatch();
  const [submitFeedback, { isLoading }] = useSubmitFeedbackMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFeedbackFormValues>({
    resolver: yupResolver(FEEDBACK_SCHEMA),
    defaultValues: FEEDBACK_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await submitFeedback({
        feedback: values.feedback,
        feedbackDescription: values.feedbackDescription,
        mealOfDay: values.mealOfDay as Exclude<typeof values.mealOfDay, ''>,
        ...(values.suggestion ? { suggestion: values.suggestion } : {}),
        ...(values.feedbackImage ? { feedbackImage: values.feedbackImage } : {}),
      }).unwrap();
      dispatch(
        showSnackbar({ severity: SNACKBAR_SEVERITY.SUCCESS, message: FEEDBACK_SUCCESS_MESSAGE }),
      );
      reset(FEEDBACK_DEFAULT_VALUES);
    } catch {
      // error toast handled centrally
    }
  });

  return { control, errors, isLoading, onSubmit };
};
