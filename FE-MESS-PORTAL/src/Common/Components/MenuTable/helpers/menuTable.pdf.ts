import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import type { IMenu } from 'Common/types/domain.types';

import { DAY_LABELS, MENU_PDF_FILENAME, ORDERED_DAYS } from '../constants/menuTable.general';

// jspdf-autotable attaches `lastAutoTable` to the document at runtime but does
// not augment the jsPDF type, so we narrow it locally to read the final Y.
interface IDocWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

// RGB tuples mirroring the SCSS palette so the PDF matches the on-screen design.
const COLOR_PRIMARY: [number, number, number] = [37, 99, 235];
const COLOR_TEXT_PRIMARY: [number, number, number] = [15, 23, 42];
const COLOR_TEXT_SECONDARY: [number, number, number] = [71, 85, 105];
const COLOR_ZEBRA: [number, number, number] = [248, 250, 252];

const MARGIN_X = 40;
const PDF_EMPTY_PLACEHOLDER = '-';

export const downloadMenuPdf = (menu: IMenu): void => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  }) as IDocWithAutoTable;
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...COLOR_TEXT_PRIMARY);
  doc.text('Weekly Mess Menu', MARGIN_X, 50);

  const body = ORDERED_DAYS.map((day) => {
    const row = menu.weeklyMenu?.[day];
    return [
      DAY_LABELS[day],
      row?.breakfast || PDF_EMPTY_PLACEHOLDER,
      row?.lunch || PDF_EMPTY_PLACEHOLDER,
      row?.dinner || PDF_EMPTY_PLACEHOLDER,
      row?.extras || PDF_EMPTY_PLACEHOLDER,
    ];
  });

  autoTable(doc, {
    head: [['Day', 'Breakfast', 'Lunch', 'Dinner', 'Extras']],
    body,
    startY: 70,
    margin: { left: MARGIN_X, right: MARGIN_X },
    styles: {
      fontSize: 10,
      cellPadding: 6,
      valign: 'middle',
      textColor: COLOR_TEXT_PRIMARY,
      halign: 'center',
    },
    headStyles: { fillColor: COLOR_PRIMARY, textColor: [255, 255, 255], fontStyle: 'bold' },
    columnStyles: { 0: { fontStyle: 'bold', halign: 'left' } },
    alternateRowStyles: { fillColor: COLOR_ZEBRA },
  });

  let cursorY = (doc.lastAutoTable?.finalY ?? 70) + 30;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...COLOR_TEXT_PRIMARY);
  doc.text('Meal Timing', MARGIN_X, cursorY);
  cursorY += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_TEXT_SECONDARY);
  const timingLines = [
    `Breakfast: ${menu.timing?.breakfast ?? PDF_EMPTY_PLACEHOLDER}`,
    `Lunch: ${menu.timing?.lunch ?? PDF_EMPTY_PLACEHOLDER}`,
    `Dinner: ${menu.timing?.dinner ?? PDF_EMPTY_PLACEHOLDER}`,
  ];
  if (menu.timing?.specialTiming) timingLines.push(`Special: ${menu.timing.specialTiming}`);
  timingLines.forEach((line) => {
    doc.text(line, MARGIN_X, cursorY);
    cursorY += 16;
  });

  if (menu.remarks) {
    cursorY += 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLOR_TEXT_PRIMARY);
    doc.text('Remarks', MARGIN_X, cursorY);
    cursorY += 18;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...COLOR_TEXT_SECONDARY);
    const wrapped = doc.splitTextToSize(menu.remarks, pageWidth - MARGIN_X * 2);
    doc.text(wrapped, MARGIN_X, cursorY);
  }

  doc.save(MENU_PDF_FILENAME);
};
