import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import { useGetStudentAnnouncementsQuery } from 'Redux/Slices/Common/AnnouncementApi';

import { renderAnnouncementCards } from './helpers/announcements.renderers';

import './announcements.scss';

const Announcements = () => {
  const { data, isLoading, error, refetch } = useGetStudentAnnouncementsQuery();

  if (isLoading) return <LoadingSkeleton count={4} height={92} />;
  if (error) return <ApiError refetch={refetch} />;
  if (!data || data.length === 0) {
    return (
      <HcEmptyState
        renderText='No announcements'
        renderSubText='Updates from the mess admin will appear here.'
      />
    );
  }

  return (
    <Box className='announcementsWrapper'>
      <Typography variant='headingL' component='h1'>
        Announcements
      </Typography>
      <Box className='announcementsWrapper__list'>{renderAnnouncementCards(data)}</Box>
    </Box>
  );
};

export default Announcements;
