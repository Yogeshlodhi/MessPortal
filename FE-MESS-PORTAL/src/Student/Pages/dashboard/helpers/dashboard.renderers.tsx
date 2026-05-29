import _map from 'lodash/map';
import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { ILeave, LeaveStatus } from 'Common/types/domain.types';

const STATUS_COLOR: Record<LeaveStatus, 'default' | 'success' | 'warning' | 'error'> = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error',
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const formatDate = (iso: string): string => new Date(iso).toLocaleDateString();

const formatCurrency = (amount: number): string => `₹ ${amount.toLocaleString('en-IN')}`;

// Inclusive day count between the two dates (e.g. 17th → 21st = 5 days).
const getLeaveDays = (startIso: string, endIso: string): number => {
  const days =
    Math.floor((new Date(endIso).getTime() - new Date(startIso).getTime()) / MS_PER_DAY) + 1;
  return days > 0 ? days : 0;
};

const renderRefund = (leave: ILeave, mealPrice: number | null) => {
  // No payout for rejected leaves, and nothing to compute without a meal price.
  if (leave.status === 'Rejected' || mealPrice == null) {
    return (
      <Typography variant='textM' component='span' className='dashboardWrapper__refundEmpty'>
        —
      </Typography>
    );
  }

  const days = getLeaveDays(leave.startDate, leave.endDate);
  const amount = days * mealPrice;
  const isApproved = leave.status === 'Approved';

  return (
    <Tooltip title={`${days} day${days === 1 ? '' : 's'} × ${formatCurrency(mealPrice)}`} arrow>
      <Typography
        variant='semiBoldLabelM'
        component='span'
        className={
          isApproved
            ? 'dashboardWrapper__refund dashboardWrapper__refund--approved'
            : 'dashboardWrapper__refund'
        }
      >
        {formatCurrency(amount)}
      </Typography>
    </Tooltip>
  );
};

export const renderLeaveRows = (leaves: ReadonlyArray<ILeave>, mealPrice: number | null) =>
  _map(leaves, (leave) => (
    <TableRow key={leave._id} hover>
      <TableCell>{formatDate(leave.appliedDate)}</TableCell>
      <TableCell>{formatDate(leave.startDate)}</TableCell>
      <TableCell>{formatDate(leave.endDate)}</TableCell>
      <TableCell>{leave.reason}</TableCell>
      <TableCell>
        <Chip size='small' color={STATUS_COLOR[leave.status]} label={leave.status} />
      </TableCell>
      <TableCell>{leave.actionTakenBy ?? '—'}</TableCell>
      <TableCell align='right'>{renderRefund(leave, mealPrice)}</TableCell>
    </TableRow>
  ));
