import { useGetComplaintsQuery } from 'Redux/Slices/Common/ComplaintApi';
import { useGetFeedbacksQuery, useGetTodayFeedbacksQuery } from 'Redux/Slices/Common/FeedbackApi';
import { useGetAllLeavesQuery, useGetTodayLeavesQuery } from 'Redux/Slices/Common/LeaveApi';
import { useGetAllStudentsQuery } from 'Redux/Slices/Common/StudentApi';

import type { IAdminDashboardStats } from '../constants/dashboard.interfaces';

export const useAdminDashboard = () => {
  const students = useGetAllStudentsQuery();
  const allLeaves = useGetAllLeavesQuery();
  const allFeedbacks = useGetFeedbacksQuery();
  const complaints = useGetComplaintsQuery();
  const todayFeedbacks = useGetTodayFeedbacksQuery();
  const todayLeaves = useGetTodayLeavesQuery();

  const queries = [students, allLeaves, allFeedbacks, complaints, todayFeedbacks, todayLeaves];

  const isLoading = queries.some((query) => query.isLoading);
  // Treat the dashboard as failed only when every source fails; otherwise show
  // whatever data did load and fall back to zero for the rest.
  const isError = queries.every((query) => query.isError);

  const refetch = () => {
    queries.forEach((query) => {
      void query.refetch();
    });
  };

  const stats: IAdminDashboardStats = {
    totalStudents: students.data?.length ?? 0,
    totalLeaves: allLeaves.data?.length ?? 0,
    totalFeedbacks: allFeedbacks.data?.length ?? 0,
    totalComplaints: complaints.data?.length ?? 0,
    feedbacksToday: todayFeedbacks.data?.length ?? 0,
    leavesToday: todayLeaves.data?.length ?? 0,
  };

  return {
    stats,
    todayFeedbacks: todayFeedbacks.data ?? [],
    todayLeaves: todayLeaves.data ?? [],
    complaints: complaints.data ?? [],
    isLoading,
    isError,
    refetch,
  };
};
