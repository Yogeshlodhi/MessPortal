import _map from 'lodash/map';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import type { ILeave, LeaveStatus } from 'Common/types/domain.types';
import { LEAVES_APPROVE_LABEL, LEAVES_REJECT_LABEL } from '../constants/leaves.general';

const STATUS_COLOR: Record<LeaveStatus, 'default' | 'success' | 'warning' | 'error'> = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error',
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const formatDate = (iso: string): string => new Date(iso).toLocaleDateString();

// Inclusive day count between two dates (e.g. 1st → 5th = 5 days).
const getLeaveDays = (startIso: string, endIso: string): number => {
  const days =
    Math.floor((new Date(endIso).getTime() - new Date(startIso).getTime()) / MS_PER_DAY) + 1;
  return days > 0 ? days : 0;
};

interface IRendererArgs {
  leaves: ReadonlyArray<ILeave>;
  canAct: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isActioning: boolean;
}

export const renderAdminLeaveCards = ({
  leaves,
  canAct,
  onApprove,
  onReject,
  isActioning,
}: IRendererArgs) =>
  _map(leaves, (leave) => {
    const days = getLeaveDays(leave.startDate, leave.endDate);
    const canActOnThis = canAct && leave.status === 'Pending';
    const showFooter = canActOnThis || Boolean(leave.actionTakenBy);

    return (
      <Box key={leave._id} className='adminLeavesWrapper__card'>
        <Box className='adminLeavesWrapper__cardHead'>
          <Box className='adminLeavesWrapper__headLeft'>
            <Typography variant='semiBoldLabelL' component='span'>
              {leave.studentRoll}
            </Typography>
            <Chip
              size='small'
              variant='outlined'
              label={`${days} ${days === 1 ? 'day' : 'days'}`}
            />
          </Box>
          <Chip size='small' color={STATUS_COLOR[leave.status]} label={leave.status} />
        </Box>

        <Box className='adminLeavesWrapper__meta'>
          <Box className='adminLeavesWrapper__metaItem'>
            <CalendarMonthOutlinedIcon fontSize='small' />
            <Typography variant='subtextM' component='span'>
              {formatDate(leave.startDate)} → {formatDate(leave.endDate)}
            </Typography>
          </Box>
          <Box className='adminLeavesWrapper__metaItem'>
            <AccessTimeOutlinedIcon fontSize='small' />
            <Typography variant='subtextM' component='span'>
              Applied {formatDate(leave.appliedDate)}
            </Typography>
          </Box>
        </Box>

        <Typography variant='textM' className='adminLeavesWrapper__reason'>
          {leave.reason}
        </Typography>

        {showFooter && (
          <Box className='adminLeavesWrapper__footer'>
            {canActOnThis ? (
              <>
                <Button
                  size='small'
                  variant='outlined'
                  color='error'
                  startIcon={<CloseIcon />}
                  onClick={() => onReject(leave._id)}
                  disabled={isActioning}
                >
                  {LEAVES_REJECT_LABEL}
                </Button>
                <Button
                  size='small'
                  variant='contained'
                  color='success'
                  startIcon={<CheckIcon />}
                  onClick={() => onApprove(leave._id)}
                  disabled={isActioning}
                >
                  {LEAVES_APPROVE_LABEL}
                </Button>
              </>
            ) : (
              <Typography variant='subtextM' className='adminLeavesWrapper__actionedBy'>
                Actioned by {leave.actionTakenBy}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  });
