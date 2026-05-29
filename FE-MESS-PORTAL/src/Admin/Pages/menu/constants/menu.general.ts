import type { DayKey } from 'Common/types/domain.types';

export const ADMIN_MENU_TITLE = 'Mess Menu';
export const ADMIN_MENU_EDIT_TITLE = 'Edit Menu';
export const ADMIN_MENU_CREATE_TITLE = 'Create Menu';
export const ADMIN_MENU_SAVE_LABEL = 'Save';
export const ADMIN_MENU_CANCEL_LABEL = 'Cancel';
export const ADMIN_MENU_EDIT_LABEL = 'Edit';
export const ADMIN_MENU_CREATE_LABEL = 'Create Menu';
export const ADMIN_MENU_SUCCESS_CREATE = 'Menu created';
export const ADMIN_MENU_SUCCESS_UPDATE = 'Menu updated';

export const DAY_KEYS_ORDER: ReadonlyArray<DayKey> = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const DAY_LABELS: Record<DayKey, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};
