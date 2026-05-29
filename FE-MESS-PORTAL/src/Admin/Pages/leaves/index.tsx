import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import { PERMISSION } from 'Rbac/roles';
import { usePermission } from 'Rbac/usePermission';

import { useAdminLeaves } from './hooks/useAdminLeaves';
import { renderAdminLeaveCards } from './helpers/leaves.renderers';
import { LEAVES_TITLE } from './constants/leaves.general';

import './leaves.scss';

const Leaves = () => {
  const { leaves, isLoading, error, refetch, approve, reject, isActioning } = useAdminLeaves();
  const { has } = usePermission();
  const canAct = has(PERMISSION.ACTION_LEAVE);

  if (isLoading) return <LoadingSkeleton count={5} height={140} />;
  if (error) return <ApiError refetch={refetch} />;
  if (!leaves || leaves.length === 0) {
    return (
      <HcEmptyState
        renderText='No leave applications'
        renderSubText='Submitted leaves will appear here.'
      />
    );
  }

  return (
    <Box className='adminLeavesWrapper'>
      <Typography variant='headingL' component='h1'>
        {LEAVES_TITLE} ({leaves.length})
      </Typography>
      <Box className='adminLeavesWrapper__list'>
        {renderAdminLeaveCards({
          leaves,
          canAct,
          onApprove: approve,
          onReject: reject,
          isActioning,
        })}
      </Box>
    </Box>
  );
};

export default Leaves;
