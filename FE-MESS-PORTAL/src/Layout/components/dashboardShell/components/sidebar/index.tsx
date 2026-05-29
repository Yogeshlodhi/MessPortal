import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import type { INavItem } from '../../constants/dashboardShell.interfaces';

import './sidebar.scss';

interface ISidebarProps {
  title: string;
  navItems: ReadonlyArray<INavItem>;
  mobileOpen: boolean;
  onClose: () => void;
}

interface ISidebarContentProps {
  title: string;
  navItems: ReadonlyArray<INavItem>;
  onNavigate?: () => void;
}

const SidebarContent = ({ title, navItems, onNavigate }: ISidebarContentProps) => (
  <>
    <Box className='sidebarWrapper__brand'>
      <Typography variant='headingS' component='h1'>
        {title}
      </Typography>
    </Box>
    <Box component='nav' className='sidebarWrapper__nav'>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            classNames('sidebarWrapper__navItem', {
              'sidebarWrapper__navItem--active': isActive,
            })
          }
        >
          <Box className='sidebarWrapper__navIcon'>{item.icon}</Box>
          <Typography variant='semiBoldLabelM' component='span'>
            {item.label}
          </Typography>
        </NavLink>
      ))}
    </Box>
  </>
);

const Sidebar = ({ title, navItems, mobileOpen, onClose }: ISidebarProps) => (
  <>
    <Box component='aside' className='sidebarWrapper'>
      <SidebarContent title={title} navItems={navItems} />
    </Box>

    <Drawer
      variant='temporary'
      open={mobileOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      classes={{ paper: 'sidebarDrawer' }}
    >
      <SidebarContent title={title} navItems={navItems} onNavigate={onClose} />
    </Drawer>
  </>
);

export default Sidebar;
