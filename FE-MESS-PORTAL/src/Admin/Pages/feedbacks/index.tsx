import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import ListControls, { type IFilterOption } from 'Common/Components/ListControls';

import { useAdminFeedbacks } from './hooks/useAdminFeedbacks';
import { renderFeedbackCards } from './helpers/feedbacks.renderers';

import './feedbacks.scss';

const MEAL_OPTIONS: ReadonlyArray<IFilterOption> = [
  { label: 'Breakfast', value: 'Breakfast' },
  { label: 'Lunch', value: 'Lunch' },
  { label: 'Dinner', value: 'Dinner' },
];

const Feedbacks = () => {
  const {
    feedbacks,
    total,
    totalPages,
    page,
    setPage,
    mealOfDay,
    setMeal,
    isFiltered,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useAdminFeedbacks();

  if (isLoading) return <LoadingSkeleton count={4} height={120} />;
  if (error) return <ApiError refetch={refetch} />;
  if (total === 0 && !isFiltered) {
    return (
      <HcEmptyState
        renderText='No feedback yet'
        renderSubText='Student feedback will appear here.'
      />
    );
  }

  return (
    <ListControls
      title='Feedback'
      total={total}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      filterLabel='Meal'
      filterValue={mealOfDay}
      filterOptions={MEAL_OPTIONS}
      onFilterChange={setMeal}
      isFetching={isFetching}
    >
      {feedbacks.length > 0 ? (
        renderFeedbackCards(feedbacks)
      ) : (
        <Typography variant='textM'>No feedback matches this filter.</Typography>
      )}
    </ListControls>
  );
};

export default Feedbacks;
