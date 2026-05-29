import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import RHFormElement from 'Common/Components/RHFormElement';
import { PERMISSION } from 'Rbac/roles';
import { usePermission } from 'Rbac/usePermission';

import { useAdminAnnouncements } from './hooks/useAdminAnnouncements';
import { renderAdminAnnouncementCards } from './helpers/announcements.renderers';

import {
  ANNOUNCEMENT_ADD_LABEL,
  ANNOUNCEMENT_DESCRIPTION_LABEL,
  ANNOUNCEMENT_HEADING_LABEL,
  ANNOUNCEMENT_TITLE,
} from './constants/announcements.general';

import './announcements.scss';

const Announcements = () => {
  const { announcements, isLoading, error, refetch, control, errors, onSubmit, isAdding, handleDelete } =
    useAdminAnnouncements();
  const { has } = usePermission();
  const canCreate = has(PERMISSION.ADD_ANNOUNCEMENT);

  return (
    <Box className='adminAnnouncementsWrapper'>
      <Typography variant='headingL' component='h1'>
        {ANNOUNCEMENT_TITLE}
      </Typography>

      {canCreate && (
        <Card>
          <CardContent>
            <Box component='form' onSubmit={onSubmit} className='adminAnnouncementsWrapper__form' noValidate>
              <RHFormElement
                control={control}
                name='heading'
                mode='text'
                label={ANNOUNCEMENT_HEADING_LABEL}
                error={errors.heading}
              />
              <RHFormElement
                control={control}
                name='description'
                mode='textarea'
                label={ANNOUNCEMENT_DESCRIPTION_LABEL}
                error={errors.description}
              />
              <Button
                type='submit'
                variant='contained'
                size='large'
                disabled={isAdding}
                className='adminAnnouncementsWrapper__submit'
              >
                {isAdding ? <CircularProgress size={22} color='inherit' /> : ANNOUNCEMENT_ADD_LABEL}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {isLoading && <LoadingSkeleton count={4} height={96} />}
      {error && <ApiError refetch={refetch} />}
      {!isLoading && !error && (!announcements || announcements.length === 0) && (
        <HcEmptyState renderText='No announcements yet' renderSubText='Posted announcements will show here.' />
      )}
      {!isLoading && !error && announcements && announcements.length > 0 && (
        <Box className='adminAnnouncementsWrapper__list'>
          {renderAdminAnnouncementCards(announcements, has, PERMISSION.DELETE_ANNOUNCEMENT, handleDelete)}
        </Box>
      )}
    </Box>
  );
};

export default Announcements;
