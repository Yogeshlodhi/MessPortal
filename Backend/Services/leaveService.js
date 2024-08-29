import LeaveModel from "../Models/leaveApplicationModel.js"

const applyLeaveService = async (leaveData, roll) => {
    try {
        const leaveApplication = await LeaveModel.create({...leaveData, studentRoll: roll})
        if(!leaveApplication) throw {message: 'Could Not apply your leave, Please Try Again Later!'}
        return leaveApplication;
    } catch (error) {
        throw { message: error.message };
    }
}

const getAllLeavesService = async (studentRoll) => {
    try {
        const list = await LeaveModel.find({ studentRoll })
        return list;
    } catch (error) {
        throw {message : error.message};
    }
}

export {
    applyLeaveService,
    getAllLeavesService,
}