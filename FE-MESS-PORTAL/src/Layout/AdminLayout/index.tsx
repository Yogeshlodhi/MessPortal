import DashboardShell from 'Layout/components/dashboardShell';
import { ADMIN_NAV_ITEMS, ADMIN_NAV_TITLE } from './constants/adminLayout.general';

const AdminLayout = () => <DashboardShell title={ADMIN_NAV_TITLE} navItems={ADMIN_NAV_ITEMS} />;

export default AdminLayout;
