import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

import ApiError from 'Common/Components/ApiError';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import { useAppSelector } from 'Redux/Store';

import { useAdminDashboard } from './hooks/useAdminDashboard';
import {
  renderRecentComplaints,
  renderStatCards,
  renderTodayFeedbacks,
  renderTodayLeaves,
} from './helpers/dashboard.renderers';

import {
  ADMIN_COMPLAINTS_TITLE,
  ADMIN_DASHBOARD_TITLE,
  ADMIN_FEEDBACKS_TODAY_TITLE,
  ADMIN_LEAVES_TODAY_TITLE,
  ADMIN_NO_COMPLAINTS,
  ADMIN_NO_FEEDBACKS_TODAY,
  ADMIN_NO_LEAVES_TODAY,
  ADMIN_RECENT_COMPLAINTS_LIMIT,
  ADMIN_VIEW_ALL_LABEL,
} from './constants/dashboard.general';

import './dashboard.scss';

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { stats, todayFeedbacks, todayLeaves, complaints, isLoading, isError, refetch } =
    useAdminDashboard();

  const recentComplaints = complaints.slice(0, ADMIN_RECENT_COMPLAINTS_LIMIT);

  return (
    <Box className='adminDashboardWrapper'>
      <Box className='adminDashboardWrapper__titleRow'>
        <Typography variant='headingL' component='h1'>
          {ADMIN_DASHBOARD_TITLE}
        </Typography>
        {user && (
          <Typography variant='subtextM' className='adminDashboardWrapper__role'>
            Signed in as {user.role}
          </Typography>
        )}
      </Box>

      {isError && <ApiError refetch={refetch} />}
      {!isError && isLoading && <LoadingSkeleton count={3} height={96} />}

      {!isError && !isLoading && (
        <>
          <Box className='adminDashboardWrapper__stats'>{renderStatCards(stats)}</Box>

          <Box className='adminDashboardWrapper__columns'>
            <Card className='adminDashboardWrapper__panel'>
              <CardContent className='adminDashboardWrapper__panelContent'>
                <Box className='adminDashboardWrapper__panelHead'>
                  <RateReviewOutlinedIcon fontSize='small' color='primary' />
                  <Typography variant='headingS' component='h2'>
                    {ADMIN_FEEDBACKS_TODAY_TITLE}
                  </Typography>
                  <Link
                    component={RouterLink}
                    to='/admin/feedbacks'
                    className='adminDashboardWrapper__viewAll'
                  >
                    {ADMIN_VIEW_ALL_LABEL}
                  </Link>
                </Box>
                {todayFeedbacks.length > 0 ? (
                  <Box className='adminDashboardWrapper__list'>
                    {renderTodayFeedbacks(todayFeedbacks)}
                  </Box>
                ) : (
                  <Typography variant='textM' className='adminDashboardWrapper__empty'>
                    {ADMIN_NO_FEEDBACKS_TODAY}
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card className='adminDashboardWrapper__panel'>
              <CardContent className='adminDashboardWrapper__panelContent'>
                <Box className='adminDashboardWrapper__panelHead'>
                  <EventBusyOutlinedIcon fontSize='small' color='primary' />
                  <Typography variant='headingS' component='h2'>
                    {ADMIN_LEAVES_TODAY_TITLE}
                  </Typography>
                  <Link
                    component={RouterLink}
                    to='/admin/leaves'
                    className='adminDashboardWrapper__viewAll'
                  >
                    {ADMIN_VIEW_ALL_LABEL}
                  </Link>
                </Box>
                {todayLeaves.length > 0 ? (
                  <Box className='adminDashboardWrapper__list'>
                    {renderTodayLeaves(todayLeaves)}
                  </Box>
                ) : (
                  <Typography variant='textM' className='adminDashboardWrapper__empty'>
                    {ADMIN_NO_LEAVES_TODAY}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>

          <Card className='adminDashboardWrapper__panel'>
            <CardContent className='adminDashboardWrapper__panelContent'>
              <Box className='adminDashboardWrapper__panelHead'>
                <ReportProblemOutlinedIcon fontSize='small' color='primary' />
                <Typography variant='headingS' component='h2'>
                  {ADMIN_COMPLAINTS_TITLE}
                </Typography>
                {complaints.length > 0 && (
                  <Link
                    component={RouterLink}
                    to='/admin/complaints'
                    className='adminDashboardWrapper__viewAll'
                  >
                    {ADMIN_VIEW_ALL_LABEL} ({complaints.length})
                  </Link>
                )}
              </Box>
              {recentComplaints.length > 0 ? (
                <Box className='adminDashboardWrapper__list'>
                  {renderRecentComplaints(recentComplaints)}
                </Box>
              ) : (
                <Typography variant='textM' className='adminDashboardWrapper__empty'>
                  {ADMIN_NO_COMPLAINTS}
                </Typography>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
