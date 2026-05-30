import {
  addAdminService,
  addMessInfoService,
  addMessinfoContact,
  announcementService,
  complaintActionService,
  complaintListService,
  deleteAnnounceService,
  deleteComplaintService,
  getDashboardStatsService,
  getLeavesService,
  getStudentsService,
  getAnnounceService,
  getFeedbackService,
  getMenuService,
  getMessInfoService,
  getSingleComplaintService,
  getStudentByEmailService,
  getTodaysFeedbackService,
  getTodaysLeavesList,
  loginAdminService,
  registerAdminService,
  updateMenuService,
  updateMessInfoService,
  uploadMenuService,
} from '../Services/adminService.js';
import { leaveActionService } from '../Services/leaveService.js';
import { statusCode } from '../Utils/http.js';
import asyncHandler from '../Utils/asyncHandler.js';
import ApiError from '../Utils/ApiError.js';
import { parseListQuery } from '../Utils/pagination.js';
import { issueAuthTokens } from '../Services/tokenService.js';

/* ───────────────────────────── Admin auth ───────────────────────────── */

const registerAdmin = asyncHandler(async (req, res) => {
  const admin = await registerAdminService(req.body);
  await issueAuthTokens(res, { userId: admin._id, role: 'Admin' });
  res.status(statusCode.created).json({ message: 'Admin Registered', data: admin });
});

const addAdmin = asyncHandler(async (req, res) => {
  const data = await addAdminService(req.body);
  res.status(statusCode.created).json({ message: 'Admin Created', data });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    throw ApiError.badRequest('Please provide email and password');
  }
  const admin = await loginAdminService(req.body);
  await issueAuthTokens(res, { userId: admin._id, role: 'Admin' });
  res.status(statusCode.ok).json({ message: 'Admin Logged In', data: admin });
});

/* ──────────────────────────── Mess info ─────────────────────────────── */

const addMessInfo = asyncHandler(async (req, res) => {
  const data = await addMessInfoService(req.body);
  res.status(statusCode.created).json({ message: 'Mess Information Added', data });
});

const getMessInfo = asyncHandler(async (req, res) => {
  const data = await getMessInfoService();
  res.status(statusCode.ok).json({ message: 'Mess Information Received', data });
});

const updateMessInfo = asyncHandler(async (req, res) => {
  const data = await updateMessInfoService(req.body, req.params.id);
  res.status(statusCode.ok).json({ message: 'Data Updated Successfully', data });
});

const addContact = asyncHandler(async (req, res) => {
  const data = await addMessinfoContact(req.body, req.params.id);
  res.status(statusCode.ok).json({ message: 'Contact Added Successfully!', data });
});

/* ───────────────────────── Dashboard stats ──────────────────────────── */

const getStats = asyncHandler(async (req, res) => {
  const data = await getDashboardStatsService();
  res.status(statusCode.ok).json({ message: 'Dashboard Stats Received', data });
});

/* ─────────────────────────── Paginated lists ────────────────────────── */

const getAllStudents = asyncHandler(async (req, res) => {
  const listParams = parseListQuery(req.query, {
    allowedSortFields: ['studentName', 'studentRoll', 'emailId', 'createdAt'],
    defaultSort: 'createdAt',
  });
  const { data, pagination } = await getStudentsService(listParams);
  res.status(statusCode.ok).json({ message: 'List Received', data, pagination });
});

const getAllLeaves = asyncHandler(async (req, res) => {
  const listParams = parseListQuery(req.query, {
    allowedSortFields: ['appliedDate', 'startDate', 'endDate', 'status'],
    defaultSort: 'appliedDate',
  });
  const { data, pagination } = await getLeavesService(listParams, { status: req.query.status });
  res.status(statusCode.ok).json({ message: 'Leaves List Received', data, pagination });
});

const getComplaintsList = asyncHandler(async (req, res) => {
  const listParams = parseListQuery(req.query, {
    allowedSortFields: ['createdAt', 'status'],
    defaultSort: 'createdAt',
  });
  const { data, pagination } = await complaintListService(listParams, { status: req.query.status });
  res.status(statusCode.ok).json({ message: 'Complaints List Received', data, pagination });
});

const getFeedbacks = asyncHandler(async (req, res) => {
  const listParams = parseListQuery(req.query, {
    allowedSortFields: ['submissionDate', 'feedback', 'createdAt'],
    defaultSort: 'submissionDate',
  });
  const { data, pagination } = await getFeedbackService(listParams, { mealOfDay: req.query.mealOfDay });
  res.status(statusCode.ok).json({ message: 'Feedbacks Received', data, pagination });
});

/* ───────────────── "Today" widgets (dashboard, small sets) ───────────── */

const getTodaysLeaves = asyncHandler(async (req, res) => {
  const data = await getTodaysLeavesList();
  res.status(statusCode.ok).json({ message: "Today's Leaves List Received", data });
});

const getTodaysFeedbacks = asyncHandler(async (req, res) => {
  const data = await getTodaysFeedbackService();
  res.status(statusCode.ok).json({ message: "Today's Feedbacks Received", data });
});

/* ──────────────────────────── Leave actions ─────────────────────────── */

const leaveAction = asyncHandler(async (req, res) => {
  const data = await leaveActionService(req.params.id, req.body, req.user.firstName);
  res.status(statusCode.ok).json({ message: 'Action Updated Successfully', data });
});

/* ──────────────────────────────── Menu ──────────────────────────────── */

const uploadMenu = asyncHandler(async (req, res) => {
  const data = await uploadMenuService(req.body);
  res.status(statusCode.created).json({ message: 'Menu Uploaded', data });
});

const updateMenu = asyncHandler(async (req, res) => {
  const data = await updateMenuService(req.body, req.params.id);
  res.status(statusCode.ok).json({ message: 'Menu updated successfully', data });
});

const getMenu = asyncHandler(async (req, res) => {
  const data = await getMenuService();
  // Return null (not []) when no menu exists so the client can cleanly
  // distinguish "no menu yet" from a real record.
  res.status(statusCode.ok).json({ message: 'Menu Details Received', data: data ?? null });
});

/* ─────────────────────────── Announcements ──────────────────────────── */

const addAnnouncement = asyncHandler(async (req, res) => {
  const data = await announcementService(req.body);
  res.status(statusCode.created).json({ message: 'Announcement Added', data });
});

const getAnnouncements = asyncHandler(async (req, res) => {
  const data = await getAnnounceService();
  res.status(statusCode.ok).json({ message: 'Announcements List Found', data });
});

const deleteAnnouncement = asyncHandler(async (req, res) => {
  const data = await deleteAnnounceService(req.params.id);
  res.status(statusCode.ok).json({ message: 'Announcement Deleted', data });
});

/* ───────────────────────────── Students ─────────────────────────────── */

const getStudentByEmail = asyncHandler(async (req, res) => {
  const { emailId } = req.query;
  const data = await getStudentByEmailService(emailId);
  if (!data) throw ApiError.notFound("There's some error getting this Student's Details");
  res.status(statusCode.ok).json({ message: `Student Data Received for ${emailId}`, data });
});

/* ───────────────────────────── Complaints ───────────────────────────── */

const deleteComplaint = asyncHandler(async (req, res) => {
  const data = await deleteComplaintService(req.params.id);
  res.status(statusCode.ok).json({ message: 'Complaint Deleted', data });
});

const takeAction = asyncHandler(async (req, res) => {
  const data = await complaintActionService(req.params.id, req.body, req.user.firstName);
  res.status(statusCode.ok).json({ message: 'Action Updated Successfully', data });
});

const getSingleComplaint = asyncHandler(async (req, res) => {
  const data = await getSingleComplaintService(req.params.id);
  res.status(statusCode.ok).json({ message: 'Complaint Received', data });
});

export {
  registerAdmin,
  loginAdmin,
  addAdmin,
  getStats,
  getAllStudents,
  getAllLeaves,
  uploadMenu,
  updateMenu,
  addAnnouncement,
  getStudentByEmail,
  getFeedbacks,
  getAnnouncements,
  deleteAnnouncement,
  getMenu,
  getComplaintsList,
  takeAction,
  getSingleComplaint,
  leaveAction,
  addMessInfo,
  getMessInfo,
  addContact,
  updateMessInfo,
  deleteComplaint,
  getTodaysLeaves,
  getTodaysFeedbacks,
};
