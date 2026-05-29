import type { ReactNode } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Chip,
} from '@mui/material';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import {
  DAY_LABELS,
  DOWNLOAD_PDF_LABEL,
  EMPTY_MEAL_PLACEHOLDER,
  MEAL_COLUMNS,
  ORDERED_DAYS,
  getTodayKey,
} from './constants/menuTable.general';
import type { IMenuTableProps } from './constants/menuTable.interfaces';
import { downloadMenuPdf } from './helpers/menuTable.pdf';

import './menuTable.scss';

const COLUMN_ICONS: Record<(typeof MEAL_COLUMNS)[number], ReactNode> = {
  Day: <CalendarMonthOutlinedIcon fontSize='small' />,
  Breakfast: <FreeBreakfastOutlinedIcon fontSize='small' />,
  Lunch: <RamenDiningOutlinedIcon fontSize='small' />,
  Dinner: <DinnerDiningOutlinedIcon fontSize='small' />,
  Extras: <AutoAwesomeOutlinedIcon fontSize='small' />,
};

const renderMeal = (value?: string): ReactNode =>
  value ? (
    <Typography variant='textM' component='span'>
      {value}
    </Typography>
  ) : (
    <Box component='span' className='menuTableWrapper__empty'>
      {EMPTY_MEAL_PLACEHOLDER}
    </Box>
  );

const MenuTable = ({ menu }: IMenuTableProps) => {
  const todayKey = getTodayKey();

  return (
    <Box className='menuTableWrapper'>
      <Box className='menuTableWrapper__toolbar'>
        <Button
          variant='outlined'
          size='small'
          startIcon={<DownloadOutlinedIcon />}
          onClick={() => downloadMenuPdf(menu)}
        >
          {DOWNLOAD_PDF_LABEL}
        </Button>
      </Box>

      <TableContainer component={Paper} className='menuTableWrapper__container'>
        <Table size='small' aria-label='Weekly mess menu'>
          <TableHead>
            <TableRow>
              {MEAL_COLUMNS.map((label) => (
                <TableCell
                  key={label}
                  align={label === 'Day' ? 'left' : 'center'}
                  className='menuTableWrapper__head'
                >
                  <Box
                    className='menuTableWrapper__headContent'
                    sx={{ justifyContent: label === 'Day' ? 'flex-start' : 'center' }}
                  >
                    {COLUMN_ICONS[label]}
                    <Typography variant='semiBoldLabelM' component='span'>
                      {label}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ORDERED_DAYS.map((day) => {
              const row = menu.weeklyMenu?.[day];
              const isToday = day === todayKey;
              return (
                <TableRow
                  key={day}
                  hover
                  selected={isToday}
                  className={isToday ? 'menuTableWrapper__todayRow' : undefined}
                >
                  <TableCell align='left'>
                    <Box className='menuTableWrapper__dayCell'>
                      <Typography variant='semiBoldLabelM' component='span'>
                        {DAY_LABELS[day]}
                      </Typography>
                      {isToday && (
                        <Chip
                          size='small'
                          color='primary'
                          label='Today'
                          className='menuTableWrapper__todayChip'
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align='center'>{renderMeal(row?.breakfast)}</TableCell>
                  <TableCell align='center'>{renderMeal(row?.lunch)}</TableCell>
                  <TableCell align='center'>{renderMeal(row?.dinner)}</TableCell>
                  <TableCell align='center'>{renderMeal(row?.extras)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className='menuTableWrapper__cards'>
        <Box className='menuTableWrapper__card'>
          <Box className='menuTableWrapper__cardTitle'>
            <AccessTimeOutlinedIcon fontSize='small' color='primary' />
            <Typography variant='semiBoldLabelM' component='h3'>
              Meal Timing
            </Typography>
          </Box>
          <Box className='menuTableWrapper__timings'>
            <Box className='menuTableWrapper__timingItem'>
              <Typography variant='semiBoldLabelS' component='span'>
                Breakfast
              </Typography>
              <Typography variant='textM'>
                {menu.timing?.breakfast ?? EMPTY_MEAL_PLACEHOLDER}
              </Typography>
            </Box>
            <Box className='menuTableWrapper__timingItem'>
              <Typography variant='semiBoldLabelS' component='span'>
                Lunch
              </Typography>
              <Typography variant='textM'>
                {menu.timing?.lunch ?? EMPTY_MEAL_PLACEHOLDER}
              </Typography>
            </Box>
            <Box className='menuTableWrapper__timingItem'>
              <Typography variant='semiBoldLabelS' component='span'>
                Dinner
              </Typography>
              <Typography variant='textM'>
                {menu.timing?.dinner ?? EMPTY_MEAL_PLACEHOLDER}
              </Typography>
            </Box>
            {menu.timing?.specialTiming && (
              <Box className='menuTableWrapper__timingItem'>
                <Typography variant='semiBoldLabelS' component='span'>
                  Special
                </Typography>
                <Typography variant='textM'>{menu.timing.specialTiming}</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {menu.remarks && (
          <Box className='menuTableWrapper__card menuTableWrapper__card--remarks'>
            <Box className='menuTableWrapper__cardTitle'>
              <InfoOutlinedIcon fontSize='small' color='primary' />
              <Typography variant='semiBoldLabelM' component='h3'>
                Remarks
              </Typography>
            </Box>
            <Typography variant='textM'>{menu.remarks}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MenuTable;
