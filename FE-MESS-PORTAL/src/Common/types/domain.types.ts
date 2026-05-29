export const DAY_KEYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export type DayKey = (typeof DAY_KEYS)[number];

export interface IDailyMenu {
  breakfast: string;
  lunch: string;
  dinner: string;
  extras?: string;
}

export interface IMealTiming {
  breakfast: string;
  lunch: string;
  dinner: string;
  specialTiming?: string;
}

export type IWeeklyMenu = Record<DayKey, IDailyMenu>;

export interface IMenu {
  _id: string;
  remarks?: string;
  timing: IMealTiming;
  weeklyMenu: IWeeklyMenu;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMenuPayload {
  remarks?: string;
  timing: IMealTiming;
  weeklyMenu: IWeeklyMenu;
}

export interface IAnnouncement {
  _id: string;
  heading: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAnnouncementPayload {
  heading: string;
  description: string;
}

export interface IMessContact {
  role: string;
  contactNo: string;
  emailId: string;
}

export interface IMessInfo {
  _id?: string;
  mealPrice: number;
  contacts: IMessContact[];
  messOwner: string;
  contractInfo: string;
  tenureStarts: string;
  tenureEnds: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMessInfoPayload {
  mealPrice: number;
  contacts: IMessContact[];
  messOwner: string;
  contractInfo: string;
  tenureStarts: string;
  tenureEnds: string;
}

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ILeave {
  _id: string;
  studentRoll: string;
  startDate: string;
  endDate: string;
  reason: string;
  appliedDate: string;
  status: LeaveStatus;
  actionTakenBy?: string;
}

export interface ILeavePayload {
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ILeaveActionPayload {
  status: Exclude<LeaveStatus, 'Pending'>;
}

export type ComplaintStatus = 'Solved' | 'In Progress' | 'Pending' | 'Rejected';

export interface IComplaint {
  _id: string;
  complaintAbout: string;
  description: string;
  student?: string;
  roll?: string;
  status: ComplaintStatus;
  actionBy?: string;
  attachment?: { public_id?: string; url?: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface IComplaintPayload {
  complaintAbout: string;
  description: string;
}

export interface IComplaintActionPayload {
  status: Exclude<ComplaintStatus, 'Pending'>;
}

export type MealOfDay = 'Breakfast' | 'Lunch' | 'Dinner';

export interface IFeedback {
  _id: string;
  feedback: number;
  feedbackDescription: string;
  suggestion?: string;
  submissionDate: string;
  student?: string;
  studentRoll?: string;
  mealOfDay: MealOfDay;
  feedbackImage?: { public_id?: string; url?: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface IFeedbackPayload {
  feedback: number;
  feedbackDescription: string;
  suggestion?: string;
  mealOfDay: MealOfDay;
}

export interface IStudentListRow {
  _id: string;
  emailId: string;
  studentName: string;
  studentRoll: string;
  number: string;
  bankAccount?: string;
  ifsc?: string;
  profileImage?: string;
  avatar?: { public_id?: string; url?: string };
}

export interface IAdminDashboardStats {
  totalStudents: number;
  totalLeaves: number;
  totalFeedbacks: number;
  totalComplaints: number;
  feedbacksToday: number;
  leavesToday: number;
}

export interface IAddAdminPayload {
  emailId: string;
  firstName: string;
  lastName?: string;
  password: string;
  adminType: 'Warden' | 'Mess Secretary' | 'Mess Owner' | 'Other';
}

export interface IUpdateStudentProfilePayload {
  studentName?: string;
  number?: string;
  bankAccount?: string;
  ifsc?: string;
}
