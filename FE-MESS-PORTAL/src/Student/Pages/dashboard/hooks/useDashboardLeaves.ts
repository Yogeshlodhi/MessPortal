import { useGetMyLeavesQuery } from 'Redux/Slices/Common/LeaveApi';
import { useGetStudentMessInfoQuery } from 'Redux/Slices/Common/MessInfoApi';

export const useDashboardLeaves = () => {
  const { data: leaves, isLoading: isLoadingLeaves, error, refetch } = useGetMyLeavesQuery();
  const { data: messInfo } = useGetStudentMessInfoQuery();

  return {
    leaves,
    isLoadingLeaves,
    error,
    refetch,
    mealPrice: messInfo?.mealPrice ?? null,
  };
};
