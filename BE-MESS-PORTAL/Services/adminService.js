import adminModel from '../Models/adminModel.js';
import announcementModel from '../Models/announcementModel.js';
import LeaveModel from '../Models/leaveApplicationModel.js';
import menuModel from '../Models/menuModel.js';
import studentModel from '../Models/studentModel.js';
import feedbackModel from '../Models/feedbackSuggestion.js';
import complaintModel from '../Models/complaintModel.js';
import messInfoModel from '../Models/messInfoModel.js';
import ApiError from '../Utils/ApiError.js';
import { buildPaginationMeta, escapeRegex } from '../Utils/pagination.js';

/**
 * Runs a single aggregation that returns one page of `data` plus the total
 * matched `count` via `$facet` — avoiding a second round-trip to the DB.
 */
const paginate = async (model, { match = {}, sort, skip, limit, page, project }) => {
  const dataPipeline = [{ $sort: sort }, { $skip: skip }, { $limit: limit }];
  if (project) dataPipeline.push({ $project: project });

  const [result] = await model.aggregate([
    { $match: match },
    {
      $facet: {
        data: dataPipeline,
        meta: [{ $count: 'total' }],
      },
    },
  ]);

  const total = result?.meta?.[0]?.total ?? 0;
  return { data: result?.data ?? [], pagination: buildPaginationMeta({ total, page, limit }) };
};

/* ───────────────────────────── Admin auth ───────────────────────────── */

const registerAdminService = async (registerData) => {
  const exists = await adminModel.exists({ emailId: registerData.emailId });
  if (exists) throw ApiError.conflict('Admin Already Exists, Please Login');

  const admin = await adminModel.create(registerData);
  admin.password = undefined;
  return admin;
};

const addAdminService = async (registerData) => {
  const exists = await adminModel.exists({ emailId: registerData.emailId });
  if (exists) throw ApiError.conflict('Admin Already Exists');

  const admin = await adminModel.create(registerData);
  admin.password = undefined;
  return admin;
};

const loginAdminService = async ({ emailId, password }) => {
  const admin = await adminModel.findOne({ emailId }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid Credentials!, Please Recheck or Register');
  }
  admin.password = undefined;
  return admin;
};

/* ──────────────────────────── Mess info ─────────────────────────────── */

const addMessInfoService = async (messInfo) => {
  return messInfoModel.create(messInfo);
};

const getMessInfoService = async () => {
  const latest = await messInfoModel.findOne().sort({ createdAt: -1 }).lean();
  return latest || {};
};

const updateMessInfoService = async (messInfo, id) => {
  const info = await messInfoModel
    .findByIdAndUpdate(id, messInfo, { new: true, runValidators: true })
    .lean();
  if (!info) throw ApiError.notFound('Mess information not found');
  return info;
};

const addMessinfoContact = async (newContact, id) => {
  const messInfo = await messInfoModel.findByIdAndUpdate(
    id,
    { $push: { contacts: newContact } },
    { new: true, runValidators: true },
  ).lean();
  if (!messInfo) throw ApiError.notFound('No Information Exists Associated with this');
  return messInfo;
};

/* ─────────────────────── Dashboard statistics ───────────────────────── */

const getDashboardStatsService = async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // All counts run in parallel; each is a cheap index-backed `countDocuments`
  // instead of streaming entire collections to the client just to size them.
  const [totalStudents, totalLeaves, totalFeedbacks, totalComplaints, leavesToday, feedbacksToday] =
    await Promise.all([
      studentModel.estimatedDocumentCount(),
      LeaveModel.estimatedDocumentCount(),
      feedbackModel.estimatedDocumentCount(),
      complaintModel.estimatedDocumentCount(),
      LeaveModel.countDocuments({ appliedDate: { $gte: startOfToday } }),
      feedbackModel.countDocuments({ submissionDate: { $gte: startOfToday } }),
    ]);

  return { totalStudents, totalLeaves, totalFeedbacks, totalComplaints, leavesToday, feedbacksToday };
};

/* ─────────────────────────── Students list ──────────────────────────── */

const getStudentsService = async (listParams) => {
  const { search, sort, skip, limit, page } = listParams;
  const match = {};
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i');
    match.$or = [{ studentName: rx }, { studentRoll: rx }, { emailId: rx }, { number: rx }];
  }
  return paginate(studentModel, {
    match,
    sort,
    skip,
    limit,
    page,
    project: { password: 0 },
  });
};

const getStudentByEmailService = async (webmail) => {
  return studentModel.findOne({ emailId: webmail }).lean();
};

/* ──────────────────────────── Leaves list ───────────────────────────── */

const getLeavesService = async (listParams, { status } = {}) => {
  const { search, sort, skip, limit, page } = listParams;
  const match = {};
  if (status) match.status = status;
  if (search) match.studentRoll = new RegExp(escapeRegex(search), 'i');
  return paginate(LeaveModel, { match, sort, skip, limit, page });
};

const getTodaysLeavesList = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return LeaveModel.find({ appliedDate: { $gte: today } }).sort({ appliedDate: -1 }).lean();
};

/* ──────────────────────────── Menu ──────────────────────────────────── */

const uploadMenuService = async (menuData) => {
  return menuModel.create(menuData);
};

const updateMenuService = async (updatedMenuData, id) => {
  const menu = await menuModel
    .findByIdAndUpdate(id, updatedMenuData, { new: true, runValidators: true })
    .lean();
  if (!menu) throw ApiError.notFound('Menu not found');
  return menu;
};

const getMenuService = async () => {
  return menuModel.findOne().sort({ createdAt: -1 }).lean();
};

/* ─────────────────────────── Announcements ──────────────────────────── */

const announcementService = async (announcementData) => {
  return announcementModel.create(announcementData);
};

const getAnnounceService = async () => {
  return announcementModel.find().sort({ createdAt: -1 }).lean();
};

const deleteAnnounceService = async (id) => {
  const deleted = await announcementModel.findByIdAndDelete(id).lean();
  if (!deleted) throw ApiError.notFound('Announcement not found');
  return deleted;
};

/* ───────────────────────────── Feedback ─────────────────────────────── */

const getFeedbackService = async (listParams, { mealOfDay } = {}) => {
  const { search, sort, skip, limit, page } = listParams;
  const match = {};
  if (mealOfDay) match.mealOfDay = mealOfDay;
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i');
    match.$or = [{ studentRoll: rx }, { student: rx }, { feedbackDescription: rx }];
  }
  return paginate(feedbackModel, { match, sort, skip, limit, page });
};

const getTodaysFeedbackService = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return feedbackModel
    .find({ submissionDate: { $gte: today } })
    .sort({ submissionDate: -1 })
    .limit(5)
    .lean();
};

/* ───────────────────────────── Complaints ───────────────────────────── */

const complaintListService = async (listParams, { status } = {}) => {
  const { search, sort, skip, limit, page } = listParams;
  const match = {};
  if (status) match.status = status;
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i');
    match.$or = [{ complaintAbout: rx }, { description: rx }, { roll: rx }, { student: rx }];
  }
  return paginate(complaintModel, { match, sort, skip, limit, page });
};

const complaintActionService = async (id, actionData, user) => {
  const updated = await complaintModel
    .findByIdAndUpdate(id, { ...actionData, actionBy: user }, { new: true, runValidators: true })
    .lean();
  if (!updated) throw ApiError.notFound('Complaint not found');
  return updated;
};

const deleteComplaintService = async (id) => {
  const deleted = await complaintModel.findByIdAndDelete(id).lean();
  if (!deleted) throw ApiError.notFound('Complaint not found');
  return deleted;
};

const getSingleComplaintService = async (id) => {
  const complaint = await complaintModel.findById(id).lean();
  if (!complaint) throw ApiError.notFound('Complaint not found');
  return complaint;
};

export {
  registerAdminService,
  loginAdminService,
  addAdminService,
  getDashboardStatsService,
  getStudentsService,
  getLeavesService,
  uploadMenuService,
  updateMenuService,
  announcementService,
  getStudentByEmailService,
  getFeedbackService,
  getAnnounceService,
  deleteAnnounceService,
  getMenuService,
  complaintListService,
  complaintActionService,
  getSingleComplaintService,
  addMessInfoService,
  getMessInfoService,
  addMessinfoContact,
  deleteComplaintService,
  getTodaysLeavesList,
  getTodaysFeedbackService,
  updateMessInfoService,
};
