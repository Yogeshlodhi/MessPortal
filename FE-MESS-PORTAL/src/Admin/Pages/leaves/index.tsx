import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import ListControls, { type IFilterOption } from 'Common/Components/ListControls';
import { PERMISSION } from 'Rbac/roles';
import { usePermission } from 'Rbac/usePermission';

import { useAdminLeaves } from './hooks/useAdminLeaves';
import { renderAdminLeaveCards } from './helpers/leaves.renderers';
import { LEAVES_TITLE } from './constants/leaves.general';

import './leaves.scss';

const STATUS_OPTIONS: ReadonlyArray<IFilterOption> = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Rejected', value: 'Rejected' },
];

const Leaves = () => {
  const {
    leaves,
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
    approve,
    reject,
    isActioning,
  } = useAdminLeaves();
  const { has } = usePermission();
  const canAct = has(PERMISSION.ACTION_LEAVE);

  if (isLoading) return <LoadingSkeleton count={5} height={140} />;
  if (error) return <ApiError refetch={refetch} />;
  if (total === 0 && !isFiltered) {
    return (
      <HcEmptyState
        renderText='No leave applications'
        renderSubText='Submitted leaves will appear here.'
      />
    );
  }

  return (
    <ListControls
      title={LEAVES_TITLE}
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
      {leaves.length > 0 ? (
        renderAdminLeaveCards({
          leaves,
          canAct,
          onApprove: approve,
          onReject: reject,
          isActioning,
        })
      ) : (
        <Typography variant='textM'>No leaves match this filter.</Typography>
      )}
    </ListControls>
  );
};

export default Leaves;
