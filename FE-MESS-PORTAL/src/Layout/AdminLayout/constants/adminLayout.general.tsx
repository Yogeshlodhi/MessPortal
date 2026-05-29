import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

import type { INavItem } from 'Layout/components/dashboardShell/constants/dashboardShell.interfaces';

export const ADMIN_NAV_TITLE = 'Mess Admin';

export const ADMIN_NAV_ITEMS: ReadonlyArray<INavItem> = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: <DashboardOutlinedIcon fontSize='small' /> },
  { label: 'Students', to: '/admin/students', icon: <GroupsOutlinedIcon fontSize='small' /> },
  { label: 'Menu', to: '/admin/menu', icon: <RestaurantMenuOutlinedIcon fontSize='small' /> },
  { label: 'Leaves', to: '/admin/leaves', icon: <EventBusyOutlinedIcon fontSize='small' /> },
  { label: 'Mess Info', to: '/admin/mess-info', icon: <InfoOutlinedIcon fontSize='small' /> },
  {
    label: 'Announcements',
    to: '/admin/announcements',
    icon: <CampaignOutlinedIcon fontSize='small' />,
  },
  {
    label: 'Complaints',
    to: '/admin/complaints',
    icon: <ReportProblemOutlinedIcon fontSize='small' />,
  },
  { label: 'Feedbacks', to: '/admin/feedbacks', icon: <FeedbackOutlinedIcon fontSize='small' /> },
  {
    label: 'Add Admin',
    to: '/admin/admin-create',
    icon: <PersonAddAlt1OutlinedIcon fontSize='small' />,
  },
];
