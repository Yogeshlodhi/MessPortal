import { useState } from 'react';

import { useGetFeedbacksQuery } from 'Redux/Slices/Common/FeedbackApi';
import type { MealOfDay } from 'Common/types/domain.types';

const PAGE_SIZE = 10;

export const useAdminFeedbacks = () => {
  const [page, setPage] = useState(1); // 1-based for MUI Pagination
  const [mealOfDay, setMealValue] = useState<'' | MealOfDay>('');

  const { data, isLoading, isFetching, error, refetch } = useGetFeedbacksQuery({
    page,
    limit: PAGE_SIZE,
    sortBy: 'submissionDate',
    order: 'desc',
    mealOfDay: mealOfDay || undefined,
  });

  const setMeal = (value: string) => {
    setMealValue(value as '' | MealOfDay);
    setPage(1);
  };

  return {
    feedbacks: data?.items ?? [],
    total: data?.pagination.total ?? 0,
    totalPages: data?.pagination.totalPages ?? 1,
    page,
    setPage,
    mealOfDay,
    setMeal,
    isFiltered: Boolean(mealOfDay),
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
