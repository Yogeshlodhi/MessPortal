import {
  complaintService,
  feedbackAndSuggestion,
  getAnnouncementsService,
  getMenuService,
  getMessInfoService,
  getProfileService,
  studentLogin,
  studentRegister,
  updateProfileService,
} from '../Services/studentService.js';
import { statusCode } from '../Utils/http.js';
import asyncHandler from '../Utils/asyncHandler.js';
import ApiError from '../Utils/ApiError.js';
import { issueAuthTokens } from '../Services/tokenService.js';

const registerStudent = asyncHandler(async (req, res) => {
  const { emailId, studentName } = req.body;
  if (!emailId || !studentName) {
    throw ApiError.badRequest('Please input the email and Student Name');
  }

  const student = await studentRegister(req.body);
  await issueAuthTokens(res, { userId: student._id, role: 'Student' });
  res.status(statusCode.created).json({ message: 'Student Registered', data: student });
});

const loginStudent = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    throw ApiError.badRequest('Please provide email and password');
  }

  const student = await studentLogin(req.body);
  await issueAuthTokens(res, { userId: student._id, role: 'Student' });
  res.status(statusCode.ok).json({ message: 'Student Logged In', data: student });
});

const getProfile = asyncHandler(async (req, res) => {
  const data = await getProfileService(req.user._id);
  res.status(statusCode.ok).json({ message: 'Student Profile Found', data });
});

const updateProfile = asyncHandler(async (req, res) => {
  const avatarFile = req.files?.avatar;
  const data = await updateProfileService(req.user._id, req.body, avatarFile);
  res.status(statusCode.ok).json({ message: 'Profile Updated Successfully', data });
});

const getMessInfo = asyncHandler(async (req, res) => {
  const data = await getMessInfoService();
  res.status(statusCode.ok).json({ message: 'Mess Information Received', data });
});

const submitFeedback = asyncHandler(async (req, res) => {
  const feedbackImage = req.files?.feedbackImage;
  const data = await feedbackAndSuggestion(req.body, req.user._id, feedbackImage);
  res.status(statusCode.created).json({ message: 'Feedback Submitted Successfully', data });
});

const addComplaint = asyncHandler(async (req, res) => {
  const complaintImage = req.files?.attachment;
  const data = await complaintService(req.body, req.user._id, complaintImage);
  res.status(statusCode.created).json({ message: 'Complaint Submitted', data });
});

const getAnnouncements = asyncHandler(async (req, res) => {
  const data = await getAnnouncementsService();
  res.status(statusCode.ok).json({ message: 'Announcements Received', data });
});

const getMenu = asyncHandler(async (req, res) => {
  const data = await getMenuService();
  res.status(statusCode.ok).json({ message: 'Menu Details Received', data: data ?? null });
});

export {
  registerStudent,
  loginStudent,
  getProfile,
  submitFeedback,
  addComplaint,
  getAnnouncements,
  getMenu,
  updateProfile,
  getMessInfo,
};
