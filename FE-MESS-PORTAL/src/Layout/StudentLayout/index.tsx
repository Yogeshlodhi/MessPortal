import DashboardShell from 'Layout/components/dashboardShell';
import { STUDENT_NAV_ITEMS, STUDENT_NAV_TITLE } from './constants/studentLayout.general';

const StudentLayout = () => (
  <DashboardShell title={STUDENT_NAV_TITLE} navItems={STUDENT_NAV_ITEMS} />
);

export default StudentLayout;
