import * as yup from 'yup';
import { LEAVE_MIN_DAYS, LEAVE_REASON_MAX_LENGTH } from '../constants/leaveApplication.general';
import type { ILeaveFormValues } from '../constants/leaveApplication.interfaces';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const isTomorrowOrLater = (value: string | undefined): boolean => {
  if (!value) return false;
  const date = new Date(value);
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date >= tomorrow;
};

// Inclusive day count between two dates (e.g. 17th → 19th = 3 days).
const inclusiveDays = (startIso: string, endIso: string): number =>
  Math.floor((new Date(endIso).getTime() - new Date(startIso).getTime()) / MS_PER_DAY) + 1;

export const LEAVE_SCHEMA: yup.ObjectSchema<ILeaveFormValues> = yup.object({
  startDate: yup
    .string()
    .required('Start date is required')
    .test('tomorrow-or-later', 'Start date must be at least tomorrow', isTomorrowOrLater),
  endDate: yup
    .string()
    .required('End date is required')
    .test('after-start', 'End date must be on or after start date', function (value) {
      const start = this.parent.startDate as string | undefined;
      if (!value || !start) return true;
      return new Date(value) >= new Date(start);
    })
    .test('min-duration', `Leave must be for at least ${LEAVE_MIN_DAYS} days`, function (value) {
      const start = this.parent.startDate as string | undefined;
      if (!value || !start) return true;
      return inclusiveDays(start, value) >= LEAVE_MIN_DAYS;
    }),
  reason: yup
    .string()
    .required('Reason is required')
    .max(LEAVE_REASON_MAX_LENGTH, `Reason cannot exceed ${LEAVE_REASON_MAX_LENGTH} characters`),
});

export const LEAVE_DEFAULT_VALUES: ILeaveFormValues = { startDate: '', endDate: '', reason: '' };
