import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchIcon from '@mui/icons-material/Search';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';

import StudentProfileDialog from './components/studentProfileDialog';
import { useStudents } from './hooks/useStudents';
import { renderStudentRows } from './helpers/students.renderers';
import { exportStudentsToCsv } from './helpers/students.export';

import {
  STUDENTS_EXPORT_LABEL,
  STUDENTS_NO_MATCH,
  STUDENTS_SEARCH_PLACEHOLDER,
  STUDENTS_TITLE,
} from './constants/students.general';

import './students.scss';

const Students = () => {
  const {
    filtered,
    total,
    search,
    setSearch,
    selected,
    openProfile,
    closeProfile,
    isLoading,
    error,
    refetch,
  } = useStudents();

  if (isLoading) return <LoadingSkeleton count={6} height={48} />;
  if (error) return <ApiError refetch={refetch} />;
  if (total === 0) return <HcEmptyState renderText='No students yet' />;

  return (
    <Box className='studentsWrapper'>
      <Box className='studentsWrapper__header'>
        <Typography variant='headingL' component='h1'>
          {STUDENTS_TITLE} ({total})
        </Typography>
        <Button
          variant='outlined'
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={() => exportStudentsToCsv(filtered)}
        >
          {STUDENTS_EXPORT_LABEL}
        </Button>
      </Box>

      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={STUDENTS_SEARCH_PLACEHOLDER}
        size='small'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon fontSize='small' />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} className='studentsWrapper__table'>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell className='studentsWrapper__head'>#</TableCell>
              <TableCell className='studentsWrapper__head'>Roll</TableCell>
              <TableCell className='studentsWrapper__head'>Name</TableCell>
              <TableCell className='studentsWrapper__head'>Email</TableCell>
              <TableCell className='studentsWrapper__head'>Phone</TableCell>
              <TableCell className='studentsWrapper__head' align='right'>
                Profile
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length > 0 ? (
              renderStudentRows({ students: filtered, onView: openProfile })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center' className='studentsWrapper__noMatch'>
                  {STUDENTS_NO_MATCH}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <StudentProfileDialog student={selected} onClose={closeProfile} />
    </Box>
  );
};

export default Students;
