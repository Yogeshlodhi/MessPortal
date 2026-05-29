import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import './listControls.scss';

export interface IFilterOption {
  label: string;
  value: string;
}

interface IListControlsProps {
  title: string;
  total: number;
  page: number; // 1-based
  totalPages: number;
  onPageChange: (page: number) => void;
  children: ReactNode;
  filterLabel?: string;
  filterValue?: string;
  filterOptions?: ReadonlyArray<IFilterOption>;
  onFilterChange?: (value: string) => void;
  isFetching?: boolean;
}

/**
 * Shared chrome for the admin card-list pages: a title with the server-side
 * total, an optional filter dropdown, the list body, and a pagination footer
 * that only appears when there is more than one page.
 */
const ListControls = ({
  title,
  total,
  page,
  totalPages,
  onPageChange,
  children,
  filterLabel = 'Filter',
  filterValue = '',
  filterOptions,
  onFilterChange,
  isFetching = false,
}: IListControlsProps) => (
  <Box className='listControls'>
    <Box className='listControls__header'>
      <Typography variant='headingL' component='h1'>
        {title} ({total})
      </Typography>
      {filterOptions && onFilterChange && (
        <FormControl size='small' className='listControls__filter'>
          <InputLabel>{filterLabel}</InputLabel>
          <Select
            value={filterValue}
            label={filterLabel}
            onChange={(event) => onFilterChange(event.target.value)}
          >
            <MenuItem value=''>All</MenuItem>
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>

    <Box className='listControls__body' sx={{ opacity: isFetching ? 0.6 : 1 }}>
      {children}
    </Box>

    {totalPages > 1 && (
      <Box className='listControls__pagination'>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_event, nextPage) => onPageChange(nextPage)}
          color='primary'
          shape='rounded'
        />
      </Box>
    )}
  </Box>
);

export default ListControls;
