import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
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

const SORTABLE_COLUMNS: ReadonlyArray<{ field: string; label: string }> = [
  { field: 'studentRoll', label: 'Roll' },
  { field: 'studentName', label: 'Name' },
  { field: 'emailId', label: 'Email' },
];

const Students = () => {
  const {
    students,
    total,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    isSearching,
    sortBy,
    order,
    handleSort,
    selected,
    openProfile,
    closeProfile,
    isLoading,
    error,
    refetch,
    fetchAllForExport,
    isExporting,
  } = useStudents();

  const handleExport = async () => {
    try {
      const rows = await fetchAllForExport();
      exportStudentsToCsv(rows);
    } catch {
      // network/error toast handled by the global interceptor
    }
  };

  if (isLoading) return <LoadingSkeleton count={6} height={48} />;
  if (error) return <ApiError refetch={refetch} />;
  if (total === 0 && !isSearching) return <HcEmptyState renderText='No students yet' />;

  return (
    <Box className='studentsWrapper'>
      <Box className='studentsWrapper__header'>
        <Typography variant='headingL' component='h1'>
          {STUDENTS_TITLE} ({total})
        </Typography>
        <Button
          variant='outlined'
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={handleExport}
          disabled={isExporting || total === 0}
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
              {SORTABLE_COLUMNS.map((column) => (
                <TableCell
                  key={column.field}
                  className='studentsWrapper__head'
                  sortDirection={sortBy === column.field ? order : false}
                >
                  <TableSortLabel
                    active={sortBy === column.field}
                    direction={sortBy === column.field ? order : 'asc'}
                    onClick={() => handleSort(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell className='studentsWrapper__head'>Phone</TableCell>
              <TableCell className='studentsWrapper__head' align='right'>
                Profile
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0 ? (
              renderStudentRows({ students, onView: openProfile, startIndex: page * limit })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center' className='studentsWrapper__noMatch'>
                  {STUDENTS_NO_MATCH}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component='div'
          count={total}
          page={page}
          onPageChange={(_event, nextPage) => setPage(nextPage)}
          rowsPerPage={limit}
          onRowsPerPageChange={(event) => setLimit(parseInt(event.target.value, 10))}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </TableContainer>

      <StudentProfileDialog student={selected} onClose={closeProfile} />
    </Box>
  );
};

export default Students;
