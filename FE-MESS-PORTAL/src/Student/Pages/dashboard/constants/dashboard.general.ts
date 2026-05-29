export const STUDENT_DASHBOARD_TITLE = 'Student Dashboard';
export const STUDENT_DASHBOARD_PLACEHOLDER =
  "Quick stats, today's menu, latest announcements and leave summary will appear here.";
export const LEAVE_HISTORY_TITLE = 'My Leave Applications';

interface ILeaveTableColumn {
  label: string;
  align: 'left' | 'right';
}

export const LEAVE_TABLE_COLUMNS: ReadonlyArray<ILeaveTableColumn> = [
  { label: 'Applied', align: 'left' },
  { label: 'Start', align: 'left' },
  { label: 'End', align: 'left' },
  { label: 'Reason', align: 'left' },
  { label: 'Status', align: 'left' },
  { label: 'Actioned By', align: 'left' },
  { label: 'Refund on Approval', align: 'right' },
];
