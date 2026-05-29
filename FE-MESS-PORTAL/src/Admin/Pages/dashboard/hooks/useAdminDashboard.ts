import { useGetComplaintsQuery } from 'Redux/Slices/Common/ComplaintApi';
import { useGetTodayFeedbacksQuery } from 'Redux/Slices/Common/FeedbackApi';
import { useGetTodayLeavesQuery } from 'Redux/Slices/Common/LeaveApi';
import { useGetAdminStatsQuery } from 'Redux/Slices/Common/StudentApi';

import { ADMIN_RECENT_COMPLAINTS_LIMIT } from '../constants/dashboard.general';
import type { IAdminDashboardStats } from '../constants/dashboard.interfaces';

const EMPTY_STATS: IAdminDashboardStats = {
  totalStudents: 0,
  totalLeaves: 0,
  totalFeedbacks: 0,
  totalComplaints: 0,
  feedbacksToday: 0,
  leavesToday: 0,
};

export const useAdminDashboard = () => {
  // Counts come from a single cheap aggregation instead of downloading every
  // collection; the panels below fetch only the small slices they render.
  const statsQuery = useGetAdminStatsQuery();
  const todayFeedbacks = useGetTodayFeedbacksQuery();
  const todayLeaves = useGetTodayLeavesQuery();
  const recentComplaints = useGetComplaintsQuery({
    page: 1,
    limit: ADMIN_RECENT_COMPLAINTS_LIMIT,
    sortBy: 'createdAt',
    order: 'desc',
  });

  const queries = [statsQuery, todayFeedbacks, todayLeaves, recentComplaints];

  const isLoading = queries.some((query) => query.isLoading);
  // Treat the dashboard as failed only when every source fails; otherwise show
  // whatever data did load and fall back to zero for the rest.
  const isError = queries.every((query) => query.isError);

  const refetch = () => {
    queries.forEach((query) => {
      void query.refetch();
    });
  };

  const stats: IAdminDashboardStats = statsQuery.data ?? EMPTY_STATS;

  return {
    stats,
    todayFeedbacks: todayFeedbacks.data ?? [],
    todayLeaves: todayLeaves.data ?? [],
    complaints: recentComplaints.data?.items ?? [],
    complaintsTotal: recentComplaints.data?.pagination.total ?? 0,
    isLoading,
    isError,
    refetch,
  };
};
