import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import MenuTable from 'Common/Components/MenuTable';
import { useGetStudentMenuQuery } from 'Redux/Slices/Common/MenuApi';

import './menu.scss';

const Menu = () => {
  const { data: menu, isLoading, error, refetch } = useGetStudentMenuQuery();

  if (isLoading) return <LoadingSkeleton count={5} height={48} />;

  if (error) return <ApiError refetch={refetch} />;
  if (!menu) {
    return (
      <HcEmptyState
        renderText='No menu published yet'
        renderSubText='The mess admin has not uploaded a menu. Please check back later.'
      />
    );
  }

  return (
    <Box className='studentMenuWrapper'>
      <Typography variant='headingL' component='h1'>
        Weekly Mess Menu
      </Typography>
      <MenuTable menu={menu} />
    </Box>
  );
};

export default Menu;
