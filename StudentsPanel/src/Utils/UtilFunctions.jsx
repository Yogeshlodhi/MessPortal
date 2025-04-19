import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`
}

const calculateDays = (start, end) => {
    const startDate = start.getTime();
    const endDate = end.getTime();
    const differenceMs = Math.abs(endDate - startDate);
    const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return daysDifference+1;
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (color !== '#fff') return color;
    return 'black';
  };

  const generatePDF = () => {
    const input = document.getElementById('table-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('meal-schedule.pdf');
    });
  };

const UtilFunctions = {
    formatDate,
    calculateDays,
    getRandomColor,
    generatePDF
}

export default UtilFunctions