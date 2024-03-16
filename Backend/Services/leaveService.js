import LeaveModel from "../Models/leaveApplicationModel.js"

const applyLeaveService = async (leaveData) => {
    try {
        const leaveApplication = await LeaveModel.create(leaveData)
        return leaveApplication ? leaveApplication : null;
    } catch (error) {
        throw { message: error.message };
    }
}

const getAllLeavesService = async (studentData) => {
    try {
        const list = await LeaveModel.find({ studentRoll: studentData._id })
        return list;
    } catch (error) {
        throw {message : error.message};
    }
}

export {
    applyLeaveService,
    getAllLeavesService,
}