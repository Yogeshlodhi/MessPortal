import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';

import { useDashboardLeaves } from './hooks/useDashboardLeaves';
import { renderLeaveRows } from './helpers/dashboard.renderers';

import {
  LEAVE_HISTORY_TITLE,
  LEAVE_TABLE_COLUMNS,
  STUDENT_DASHBOARD_PLACEHOLDER,
  STUDENT_DASHBOARD_TITLE,
} from './constants/dashboard.general';

import './dashboard.scss';

const Dashboard = () => {
  const { leaves, isLoadingLeaves, error, refetch, mealPrice } = useDashboardLeaves();

  return (
    <Box className='dashboardWrapper'>
      <Typography variant='headingL' component='h1'>
        {STUDENT_DASHBOARD_TITLE}
      </Typography>
      <Typography variant='textM' className='dashboardWrapper__placeholder'>
        {STUDENT_DASHBOARD_PLACEHOLDER}
      </Typography>

      <Box className='dashboardWrapper__sectionTitle'>
        <EventNoteOutlinedIcon fontSize='small' color='primary' />
        <Typography variant='headingS' component='h2'>
          {LEAVE_HISTORY_TITLE}
        </Typography>
      </Box>

      {isLoadingLeaves && <LoadingSkeleton count={4} height={48} />}
      {error && <ApiError refetch={refetch} />}
      {!isLoadingLeaves && !error && (!leaves || leaves.length === 0) && (
        <HcEmptyState
          renderText='No leave applications yet'
          renderSubText='Submitted applications will appear here.'
        />
      )}
      {!isLoadingLeaves && !error && leaves && leaves.length > 0 && (
        <TableContainer component={Paper} className='dashboardWrapper__tableContainer'>
          <Table size='small'>
            <TableHead>
              <TableRow>
                {LEAVE_TABLE_COLUMNS.map((column) => (
                  <TableCell
                    key={column.label}
                    align={column.align}
                    className='dashboardWrapper__head'
                  >
                    <Typography variant='semiBoldLabelM' component='span'>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{renderLeaveRows(leaves, mealPrice)}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Dashboard;
