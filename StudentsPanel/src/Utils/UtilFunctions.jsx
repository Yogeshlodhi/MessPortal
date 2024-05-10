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

const UtilFunctions = {
    formatDate,
    calculateDays
}

export default UtilFunctions