import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import ListControls, { type IFilterOption } from 'Common/Components/ListControls';
import { PERMISSION } from 'Rbac/roles';
import { usePermission } from 'Rbac/usePermission';

import { useAdminComplaints } from './hooks/useAdminComplaints';
import { renderComplaintCards } from './helpers/complaints.renderers';
import { COMPLAINTS_TITLE } from './constants/complaints.general';

import './complaints.scss';

const STATUS_OPTIONS: ReadonlyArray<IFilterOption> = [
  { label: 'Pending', value: 'Pending' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Solved', value: 'Solved' },
  { label: 'Rejected', value: 'Rejected' },
];

const Complaints = () => {
  const {
    complaints,
    total,
    totalPages,
    page,
    setPage,
    status,
    setStatus,
    isFiltered,
    isLoading,
    isFetching,
    error,
    refetch,
    handleAction,
    handleDelete,
    isActioning,
    isDeleting,
  } = useAdminComplaints();
  const { has } = usePermission();

  if (isLoading) return <LoadingSkeleton count={4} height={120} />;
  if (error) return <ApiError refetch={refetch} />;
  if (total === 0 && !isFiltered) {
    return (
      <HcEmptyState
        renderText='No complaints'
        renderSubText='Submitted complaints will appear here.'
      />
    );
  }

  return (
    <ListControls
      title={COMPLAINTS_TITLE}
      total={total}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      filterLabel='Status'
      filterValue={status}
      filterOptions={STATUS_OPTIONS}
      onFilterChange={setStatus}
      isFetching={isFetching}
    >
      {complaints.length > 0 ? (
        renderComplaintCards({
          complaints,
          hasPerm: has,
          actionPerm: PERMISSION.ACTION_COMPLAINT,
          deletePerm: PERMISSION.DELETE_COMPLAINT,
          onAction: handleAction,
          onDelete: handleDelete,
          isActioning,
          isDeleting,
        })
      ) : (
        <Typography variant='textM'>No complaints match this filter.</Typography>
      )}
    </ListControls>
  );
};

export default Complaints;
