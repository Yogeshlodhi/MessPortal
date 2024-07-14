const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
};

const calculateDays = (start, end) => {
    const startDate = start.getTime();
    const endDate = end.getTime();
    const differenceMs = Math.abs(endDate - startDate);
    const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return daysDifference + 1;
};

const areDatesEqual = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};

const filterLeavesByToday = (leaves) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return leaves.filter(leave => {
        const appliedDate = new Date(leave.appliedDate);
        return areDatesEqual(appliedDate, today);
    });
};

const filterFeedbacksByToday = (feedbacks) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return feedbacks.filter(feedback => {
        const appliedDate = new Date(feedback.submissionDate);
        return areDatesEqual(appliedDate, today);
    });
};

const UtilFunctions = {
    formatDate,
    calculateDays,
    areDatesEqual,
    filterLeavesByToday,
    filterFeedbacksByToday
};

export default UtilFunctions;
