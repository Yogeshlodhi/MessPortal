import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import { PERMISSION } from 'Rbac/roles';
import { usePermission } from 'Rbac/usePermission';

import { useAdminComplaints } from './hooks/useAdminComplaints';
import { renderComplaintCards } from './helpers/complaints.renderers';
import { COMPLAINTS_TITLE } from './constants/complaints.general';

import './complaints.scss';

const Complaints = () => {
  const { complaints, isLoading, error, refetch, handleAction, handleDelete, isActioning, isDeleting } =
    useAdminComplaints();
  const { has } = usePermission();

  if (isLoading) return <LoadingSkeleton count={4} height={120} />;
  if (error) return <ApiError refetch={refetch} />;
  if (!complaints || complaints.length === 0) {
    return <HcEmptyState renderText='No complaints' renderSubText='Submitted complaints will appear here.' />;
  }

  return (
    <Box className='adminComplaintsWrapper'>
      <Typography variant='headingL' component='h1'>
        {COMPLAINTS_TITLE} ({complaints.length})
      </Typography>
      <Box className='adminComplaintsWrapper__list'>
        {renderComplaintCards({
          complaints,
          hasPerm: has,
          actionPerm: PERMISSION.ACTION_COMPLAINT,
          deletePerm: PERMISSION.DELETE_COMPLAINT,
          onAction: handleAction,
          onDelete: handleDelete,
          isActioning,
          isDeleting,
        })}
      </Box>
    </Box>
  );
};

export default Complaints;
