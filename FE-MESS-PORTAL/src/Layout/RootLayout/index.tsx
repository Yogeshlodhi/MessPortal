import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import SnackbarHost from 'Common/Components/SnackbarHost';

import './rootLayout.scss';

const RootLayout = () => (
  <Box className='rootLayoutWrapper'>
    <Outlet />
    <SnackbarHost />
  </Box>
);

export default RootLayout;
