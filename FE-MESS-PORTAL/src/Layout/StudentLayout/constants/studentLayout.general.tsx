import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import type { INavItem } from 'Layout/components/dashboardShell/constants/dashboardShell.interfaces';

export const STUDENT_NAV_TITLE = 'Mess Portal';

export const STUDENT_NAV_ITEMS: ReadonlyArray<INavItem> = [
  {
    label: 'Dashboard',
    to: '/student/dashboard',
    icon: <DashboardOutlinedIcon fontSize='small' />,
  },
  { label: 'Menu', to: '/student/menu', icon: <RestaurantMenuOutlinedIcon fontSize='small' /> },
  {
    label: 'Announcements',
    to: '/student/announcements',
    icon: <CampaignOutlinedIcon fontSize='small' />,
  },
  { label: 'Feedback', to: '/student/feedback', icon: <FeedbackOutlinedIcon fontSize='small' /> },
  {
    label: 'Complaints',
    to: '/student/complaints',
    icon: <ReportProblemOutlinedIcon fontSize='small' />,
  },
  {
    label: 'Apply Leave',
    to: '/student/apply-leave',
    icon: <EventBusyOutlinedIcon fontSize='small' />,
  },
  { label: 'Mess Info', to: '/student/mess-info', icon: <InfoOutlinedIcon fontSize='small' /> },
  {
    label: 'Profile',
    to: '/student/profile',
    icon: <PersonOutlineOutlinedIcon fontSize='small' />,
  },
];
