import type { IStudentListRow } from 'Common/types/domain.types';
import { STUDENTS_CSV_FILENAME } from '../constants/students.general';

const HEADERS = ['Roll', 'Name', 'Email', 'Phone', 'Bank Account', 'IFSC'];

// Byte-order mark (U+FEFF) so Excel opens the CSV as UTF-8.
const BOM = String.fromCharCode(0xfeff);

const escapeCsv = (value: string): string =>
  /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

// Exports the student list as a UTF-8 CSV (opens directly in Excel).
export const exportStudentsToCsv = (students: ReadonlyArray<IStudentListRow>): void => {
  const rows = students.map((student) =>
    [
      student.studentRoll,
      student.studentName,
      student.emailId,
      student.number,
      student.bankAccount ?? '',
      student.ifsc ?? '',
    ]
      .map((field) => escapeCsv(String(field ?? '')))
      .join(','),
  );

  const csv = BOM + [HEADERS.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = STUDENTS_CSV_FILENAME;
  link.click();
  URL.revokeObjectURL(url);
};
