import LeaveModel from '../Models/leaveApplicationModel.js';
import ApiError from '../Utils/ApiError.js';

const applyLeaveService = async (leaveData, roll) => {
  return LeaveModel.create({ ...leaveData, studentRoll: roll });
};

const getAllLeavesService = async (studentRoll) => {
  // Backed by the { studentRoll, appliedDate } compound index.
  return LeaveModel.find({ studentRoll }).sort({ appliedDate: -1 }).lean();
};

const leaveActionService = async (id, actionData, user) => {
  const updatedLeave = await LeaveModel.findByIdAndUpdate(
    id,
    { ...actionData, actionTakenBy: user },
    { new: true, runValidators: true },
  ).lean();
  if (!updatedLeave) throw ApiError.notFound('Leave application not found');
  return updatedLeave;
};

export { applyLeaveService, getAllLeavesService, leaveActionService };
