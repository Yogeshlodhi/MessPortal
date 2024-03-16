import LeaveModel from "../Models/leaveApplicationModel.js"

const applyLeaveService = async (leaveData) => {
    try {
        const leaveApplication = await LeaveModel.create(leaveData)
        return leaveApplication ? leaveApplication : null;
    } catch (error) {
        throw {message: error.message};
    }
}

export {
    applyLeaveService,
}