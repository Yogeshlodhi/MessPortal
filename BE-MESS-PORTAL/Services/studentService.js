import cloudinary from 'cloudinary';
import studentModel from '../Models/studentModel.js';
import feedbackModel from '../Models/feedbackSuggestion.js';
import complaintModel from '../Models/complaintModel.js';
import announcementModel from '../Models/announcementModel.js';
import menuModel from '../Models/menuModel.js';
import messInfoModel from '../Models/messInfoModel.js';
import { hashPassword } from '../Utils/createToken.js';
import ApiError from '../Utils/ApiError.js';

/** Streams a file buffer to Cloudinary and resolves with the upload result. */
const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder, width: folder === 'avatars' ? 250 : 200, crop: 'scale' },
      (error, result) => (error ? reject(error) : resolve(result)),
    );
    stream.end(buffer);
  });

const studentRegister = async (registrationData) => {
  const { emailId, studentName, studentRoll, number, password } = registrationData;

  const studentExists = await studentModel.exists({ emailId });
  if (studentExists) {
    throw ApiError.conflict('Student Already Exists, Please Login');
  }

  const student = await studentModel.create({ emailId, studentName, studentRoll, number, password });
  student.password = undefined;
  return student;
};

const studentLogin = async ({ emailId, password }) => {
  // Password is `select: false`, so it must be explicitly requested for the check.
  const student = await studentModel.findOne({ emailId }).select('+password');
  if (!student || !(await student.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid Credentials!, Please Recheck or Register');
  }
  student.password = undefined;
  return student;
};

const getProfileService = async (userId) => {
  const user = await studentModel.findById(userId).lean();
  if (!user) throw ApiError.notFound('User Not Found');
  return user;
};

const updateProfileService = async (userId, profileData, avatarFile) => {
  if (avatarFile) {
    const existing = await studentModel.findById(userId).select('avatar').lean();
    if (existing?.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(existing.avatar.public_id);
    }
    const uploadResult = await uploadToCloudinary(avatarFile.data, 'avatars');
    profileData.avatar = { public_id: uploadResult.public_id, url: uploadResult.secure_url };
  }

  if (profileData.password) {
    profileData.password = await hashPassword(profileData.password);
  }

  const updatedUser = await studentModel
    .findByIdAndUpdate(userId, profileData, { new: true, runValidators: true })
    .select('-password')
    .lean();

  if (!updatedUser) throw ApiError.notFound('User not found');
  return updatedUser;
};

const getMessInfoService = async () => {
  const latest = await messInfoModel.findOne().sort({ createdAt: -1 }).lean();
  return latest || {};
};

const feedbackAndSuggestion = async (feedbackData, studentId, feedbackImage) => {
  const student = await studentModel.findById(studentId).select('studentName studentRoll').lean();
  if (!student) throw ApiError.notFound('Student not found');

  if (feedbackImage) {
    const uploadResult = await uploadToCloudinary(feedbackImage.data, 'feedbacks');
    feedbackData.feedbackImage = { public_id: uploadResult.public_id, url: uploadResult.secure_url };
  }

  return feedbackModel.create({
    ...feedbackData,
    student: student.studentName,
    studentRoll: student.studentRoll,
  });
};

const complaintService = async (complaint, studentId, complaintImage) => {
  const student = await studentModel.findById(studentId).select('studentName studentRoll').lean();
  if (!student) throw ApiError.notFound('Student not found');

  if (complaintImage) {
    const uploadResult = await uploadToCloudinary(complaintImage.data, 'complaints');
    complaint.attachment = { public_id: uploadResult.public_id, url: uploadResult.secure_url };
  }

  return complaintModel.create({
    ...complaint,
    student: student.studentName,
    roll: student.studentRoll,
  });
};

const getAnnouncementsService = async () => {
  return announcementModel.find().sort({ createdAt: -1 }).lean();
};

const getMenuService = async () => {
  return menuModel.findOne().sort({ createdAt: -1 }).lean();
};

export {
  studentRegister,
  studentLogin,
  feedbackAndSuggestion,
  complaintService,
  getAnnouncementsService,
  getMenuService,
  updateProfileService,
  getProfileService,
  getMessInfoService,
};
