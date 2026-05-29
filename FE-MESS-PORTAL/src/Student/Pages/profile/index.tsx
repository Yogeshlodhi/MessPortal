import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import ApiError from 'Common/Components/ApiError';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import RHFormElement from 'Common/Components/RHFormElement';

import { useProfile } from './hooks/useProfile';

import {
  PROFILE_BANK_LABEL,
  PROFILE_DETAILS_TITLE,
  PROFILE_IFSC_LABEL,
  PROFILE_NAME_LABEL,
  PROFILE_PHONE_LABEL,
  PROFILE_SAVE_LABEL,
} from './constants/profile.general';

import './profile.scss';

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';
  return (first + last).toUpperCase() || '?';
};

const Profile = () => {
  const { control, errors, isLoading, error, refetch, isSaving, onSubmit, profile } = useProfile();

  if (isLoading) return <LoadingSkeleton count={5} height={56} />;
  if (error) return <ApiError refetch={refetch} />;
  if (!profile) return <ApiError refetch={refetch} title='Profile unavailable' />;

  return (
    <Box className='profileWrapper'>
      <Card>
        <CardContent>
          <Box className='profileWrapper__header'>
            <Avatar className='profileWrapper__avatar' src={profile.avatar?.url}>
              {getInitials(profile.studentName)}
            </Avatar>
            <Box className='profileWrapper__identity'>
              <Typography variant='headingM' component='h1'>
                {profile.studentName || 'My Profile'}
              </Typography>
              <Box className='profileWrapper__meta'>
                <Chip
                  size='small'
                  variant='outlined'
                  icon={<EmailOutlinedIcon />}
                  label={profile.emailId}
                />
                <Chip
                  size='small'
                  variant='outlined'
                  icon={<BadgeOutlinedIcon />}
                  label={`Roll: ${profile.studentRoll}`}
                />
              </Box>
            </Box>
          </Box>

          <Divider className='profileWrapper__divider' />

          <Typography variant='headingS' component='h2' className='profileWrapper__sectionTitle'>
            {PROFILE_DETAILS_TITLE}
          </Typography>

          <Box component='form' onSubmit={onSubmit} className='profileWrapper__form' noValidate>
            <Box className='profileWrapper__grid'>
              <RHFormElement
                control={control}
                name='studentName'
                mode='text'
                label={PROFILE_NAME_LABEL}
                error={errors.studentName}
              />
              <RHFormElement
                control={control}
                name='number'
                mode='text'
                label={PROFILE_PHONE_LABEL}
                error={errors.number}
              />
              <RHFormElement
                control={control}
                name='bankAccount'
                mode='text'
                label={PROFILE_BANK_LABEL}
                error={errors.bankAccount}
              />
              <RHFormElement
                control={control}
                name='ifsc'
                mode='text'
                label={PROFILE_IFSC_LABEL}
                error={errors.ifsc}
              />
            </Box>
            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isSaving}
              className='profileWrapper__submit'
            >
              {isSaving ? <CircularProgress size={22} color='inherit' /> : PROFILE_SAVE_LABEL}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
