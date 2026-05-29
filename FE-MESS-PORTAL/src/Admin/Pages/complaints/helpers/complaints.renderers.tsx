import _map from 'lodash/map';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import type { ComplaintStatus, IComplaint } from 'Common/types/domain.types';
import type { Permission } from 'Rbac/roles';
import {
  COMPLAINTS_DELETE,
  COMPLAINTS_MARK_PROGRESS,
  COMPLAINTS_MARK_SOLVED,
  COMPLAINTS_REJECT,
} from '../constants/complaints.general';

const STATUS_COLOR: Record<ComplaintStatus, 'default' | 'success' | 'warning' | 'info' | 'error'> = {
  Solved: 'success',
  'In Progress': 'info',
  Pending: 'warning',
  Rejected: 'error',
};

interface IArgs {
  complaints: ReadonlyArray<IComplaint>;
  hasPerm: (perm: Permission) => boolean;
  actionPerm: Permission;
  deletePerm: Permission;
  onAction: (id: string, status: Exclude<ComplaintStatus, 'Pending'>) => void;
  onDelete: (id: string) => void;
  isActioning: boolean;
  isDeleting: boolean;
}

export const renderComplaintCards = ({
  complaints,
  hasPerm,
  actionPerm,
  deletePerm,
  onAction,
  onDelete,
  isActioning,
  isDeleting,
}: IArgs) =>
  _map(complaints, (c) => (
    <Card key={c._id} className='adminComplaintsWrapper__card'>
      <CardContent>
        <Box className='adminComplaintsWrapper__cardHeader'>
          <Typography variant='headingS' component='h3'>
            {c.complaintAbout}
          </Typography>
          <Chip size='small' color={STATUS_COLOR[c.status]} label={c.status} />
        </Box>
        <Typography variant='textM' className='adminComplaintsWrapper__description'>
          {c.description}
        </Typography>
        {c.roll && (
          <Typography variant='subtextM' className='adminComplaintsWrapper__meta'>
            By {c.student ?? 'student'} ({c.roll})
          </Typography>
        )}
        {hasPerm(actionPerm) && (
          <Box className='adminComplaintsWrapper__actions'>
            <Button
              size='small'
              variant='contained'
              color='success'
              onClick={() => onAction(c._id, 'Solved')}
              disabled={isActioning}
            >
              {COMPLAINTS_MARK_SOLVED}
            </Button>
            <Button
              size='small'
              variant='outlined'
              onClick={() => onAction(c._id, 'In Progress')}
              disabled={isActioning}
            >
              {COMPLAINTS_MARK_PROGRESS}
            </Button>
            <Button
              size='small'
              variant='outlined'
              color='error'
              onClick={() => onAction(c._id, 'Rejected')}
              disabled={isActioning}
            >
              {COMPLAINTS_REJECT}
            </Button>
          </Box>
        )}
        {hasPerm(deletePerm) && (
          <Box className='adminComplaintsWrapper__deleteRow'>
            <Button
              size='small'
              color='error'
              onClick={() => onDelete(c._id)}
              disabled={isDeleting}
            >
              {COMPLAINTS_DELETE}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  ));
