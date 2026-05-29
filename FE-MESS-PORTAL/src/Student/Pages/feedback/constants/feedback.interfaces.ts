import type { MealOfDay } from 'Common/types/domain.types';

export interface IFeedbackFormValues {
  feedback: number;
  feedbackDescription: string;
  suggestion: string;
  mealOfDay: MealOfDay | '';
  feedbackImage: File | null;
}
