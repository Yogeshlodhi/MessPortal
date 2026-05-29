import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import Sidebar from './components/sidebar';
import Header from './components/header';

import type { IDashboardShellProps } from './constants/dashboardShell.interfaces';

import './dashboardShell.scss';

const DashboardShell = ({ navItems, title }: IDashboardShellProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <Box className='dashboardShellWrapper'>
      <Sidebar
        title={title}
        navItems={navItems}
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <Box className='dashboardShellWrapper__main'>
        <Header onMenuClick={() => setMobileNavOpen(true)} />
        <Box component='main' className='dashboardShellWrapper__content'>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardShell;
