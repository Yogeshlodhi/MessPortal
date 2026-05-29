import type { ReactNode } from 'react';
import _map from 'lodash/map';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';

import type { ComplaintStatus, IComplaint, IFeedback, ILeave } from 'Common/types/domain.types';

import type { IAdminDashboardStats, StatColor } from '../constants/dashboard.interfaces';

interface IStatMeta {
  key: keyof IAdminDashboardStats;
  label: string;
  icon: ReactNode;
  color: StatColor;
}

const STAT_CARDS: ReadonlyArray<IStatMeta> = [
  { key: 'totalStudents', label: 'Total Students', icon: <GroupsOutlinedIcon />, color: 'primary' },
  { key: 'totalLeaves', label: 'Total Leaves', icon: <EventBusyOutlinedIcon />, color: 'info' },
  {
    key: 'totalFeedbacks',
    label: 'Total Feedbacks',
    icon: <FeedbackOutlinedIcon />,
    color: 'success',
  },
  {
    key: 'totalComplaints',
    label: 'Total Complaints',
    icon: <ReportProblemOutlinedIcon />,
    color: 'error',
  },
  {
    key: 'feedbacksToday',
    label: 'Feedbacks Today',
    icon: <RateReviewOutlinedIcon />,
    color: 'warning',
  },
  { key: 'leavesToday', label: 'Leaves Today', icon: <TodayOutlinedIcon />, color: 'primary' },
];

const COMPLAINT_STATUS_COLOR: Record<
  ComplaintStatus,
  'default' | 'success' | 'warning' | 'error' | 'info'
> = {
  Solved: 'success',
  'In Progress': 'info',
  Pending: 'warning',
  Rejected: 'error',
};

const formatDate = (iso: string): string => new Date(iso).toLocaleDateString();

export const renderStatCards = (stats: IAdminDashboardStats) =>
  _map(STAT_CARDS, (card) => (
    <Card key={card.key} className='adminDashboardWrapper__statCard'>
      <CardContent className='adminDashboardWrapper__statContent'>
        <Box
          className={`adminDashboardWrapper__statIcon adminDashboardWrapper__statIcon--${card.color}`}
        >
          {card.icon}
        </Box>
        <Box className='adminDashboardWrapper__statText'>
          <Typography
            variant='displayM'
            component='span'
            className='adminDashboardWrapper__statValue'
          >
            {stats[card.key]}
          </Typography>
          <Typography variant='subtextM' className='adminDashboardWrapper__statLabel'>
            {card.label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ));

export const renderTodayFeedbacks = (feedbacks: ReadonlyArray<IFeedback>) =>
  _map(feedbacks, (feedback) => (
    <Box key={feedback._id} className='adminDashboardWrapper__item'>
      <Box className='adminDashboardWrapper__itemHead'>
        <Rating value={feedback.feedback} max={5} size='small' readOnly />
        <Chip size='small' variant='outlined' label={feedback.mealOfDay} />
        <Typography variant='subtextS' className='adminDashboardWrapper__muted'>
          {feedback.studentRoll ?? '—'}
        </Typography>
      </Box>
      <Typography variant='textM'>{feedback.feedbackDescription}</Typography>
    </Box>
  ));

export const renderTodayLeaves = (leaves: ReadonlyArray<ILeave>) =>
  _map(leaves, (leave) => (
    <Box key={leave._id} className='adminDashboardWrapper__item'>
      <Box className='adminDashboardWrapper__itemHead'>
        <Typography variant='semiBoldLabelM' component='span'>
          {leave.studentRoll}
        </Typography>
        <Typography variant='subtextS' className='adminDashboardWrapper__muted'>
          {formatDate(leave.startDate)} – {formatDate(leave.endDate)}
        </Typography>
      </Box>
      <Typography variant='textM'>{leave.reason}</Typography>
    </Box>
  ));

export const renderRecentComplaints = (complaints: ReadonlyArray<IComplaint>) =>
  _map(complaints, (complaint) => (
    <Box key={complaint._id} className='adminDashboardWrapper__item'>
      <Box className='adminDashboardWrapper__itemHead'>
        <Typography variant='semiBoldLabelM' component='span'>
          {complaint.roll ?? complaint.student ?? '—'}
        </Typography>
        <Chip
          size='small'
          color={COMPLAINT_STATUS_COLOR[complaint.status]}
          label={complaint.status}
        />
      </Box>
      <Typography variant='textM'>
        <Typography variant='semiBoldLabelM' component='span'>
          {complaint.complaintAbout}
        </Typography>
        {complaint.description ? ` — ${complaint.description}` : ''}
      </Typography>
    </Box>
  ));
