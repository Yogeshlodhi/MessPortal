export interface IAdminDashboardStats {
  totalStudents: number;
  totalLeaves: number;
  totalFeedbacks: number;
  totalComplaints: number;
  feedbacksToday: number;
  leavesToday: number;
}

export type StatColor = 'primary' | 'info' | 'success' | 'error' | 'warning';
