import type { DayKey } from 'Common/types/domain.types';
import { DAY_KEYS } from 'Common/types/domain.types';

export const DAY_LABELS: Record<DayKey, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export const MEAL_COLUMNS = ['Day', 'Breakfast', 'Lunch', 'Dinner', 'Extras'] as const;

export const ORDERED_DAYS: ReadonlyArray<DayKey> = DAY_KEYS;

export const EMPTY_MEAL_PLACEHOLDER = '—';

export const DOWNLOAD_PDF_LABEL = 'Download PDF';
export const MENU_PDF_FILENAME = 'weekly-mess-menu.pdf';

// Maps JS Date.getDay() (0 = Sunday) to the menu's DayKey.
const JS_DAY_TO_KEY: ReadonlyArray<DayKey> = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const getTodayKey = (): DayKey => JS_DAY_TO_KEY[new Date().getDay()];
