import LeaveModel from "../Models/leaveApplicationModel.js"

const applyLeaveService = async (leaveData, roll) => {
    try {
        const leaveApplication = await LeaveModel.create({...leaveData, studentRoll: roll})
        return leaveApplication ? leaveApplication : null;
    } catch (error) {
        throw { message: error.message };
    }
}

const getAllLeavesService = async (studentData) => {
    try {
        // console.log(studentData)
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