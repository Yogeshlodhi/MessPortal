import { applyLeaveService, getAllLeavesService } from '../Services/leaveService.js';
import { statusCode } from '../Utils/http.js';
import asyncHandler from '../Utils/asyncHandler.js';

const applyLeave = asyncHandler(async (req, res) => {
  const data = await applyLeaveService(req.body, req.user.studentRoll);
  res.status(statusCode.created).json({ message: 'Leave Applied', data });
});

const getAllLeaves = asyncHandler(async (req, res) => {
  const data = await getAllLeavesService(req.user.studentRoll);
  res.status(statusCode.ok).json({ message: 'Leaves Found', data });
});

export { applyLeave, getAllLeaves };
