import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import { useGetFeedbacksQuery } from 'Redux/Slices/Common/FeedbackApi';

import { renderFeedbackCards } from './helpers/feedbacks.renderers';

import './feedbacks.scss';

const Feedbacks = () => {
  const { data, isLoading, error, refetch } = useGetFeedbacksQuery();

  if (isLoading) return <LoadingSkeleton count={4} height={120} />;
  if (error) return <ApiError refetch={refetch} />;
  if (!data || data.length === 0) {
    return <HcEmptyState renderText='No feedback yet' renderSubText='Student feedback will appear here.' />;
  }

  return (
    <Box className='adminFeedbacksWrapper'>
      <Typography variant='headingL' component='h1'>
        Feedback ({data.length})
      </Typography>
      <Box className='adminFeedbacksWrapper__list'>{renderFeedbackCards(data)}</Box>
    </Box>
  );
};

export default Feedbacks;
