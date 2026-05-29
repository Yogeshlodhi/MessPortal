import { Router } from 'express';
import {
  getAllLeaves,
  getAllStudents,
  loginAdmin,
  registerAdmin,
  uploadMenu,
  addAnnouncement,
  updateMenu,
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
  deleteComplaint,
  getTodaysLeaves,
  getTodaysFeedbacks,
  addContact,
  logout,
  addAdmin,
  updateMessInfo,
  getStats,
} from '../Controllers/adminController.js';
import { authenticateUser, authorizeRoles } from '../Middleware/userPermission.js';
import { authLimiter } from '../Middleware/rateLimiter.js';

const router = Router();

router.post('', authLimiter, registerAdmin);
router.post('/addAdmin', authenticateUser, authorizeRoles(['Warden']), addAdmin);
router.post('/login', authLimiter, loginAdmin);
router.get('/logout', logout);

router
  .route('/messInfo')
  .post(authenticateUser, authorizeRoles(['Warden', 'Mess Secretary', 'Mess Owner']), addMessInfo)
  .get(getMessInfo);
router.put('/messInfo/:id', authenticateUser, authorizeRoles(['Warden']), updateMessInfo);
router.post(
  '/messInfo/addContact/:id',
  authenticateUser,
  authorizeRoles(['Mess Secretary', 'Mess Owner']),
  addContact,
);

router.get('/stats', authenticateUser, getStats);

router.get('/students_list', authenticateUser, getAllStudents);
router.get('/student_profile', authenticateUser, getStudentByEmail);

router
  .route('/announcement')
  .post(authenticateUser, authorizeRoles(['Mess Secretary']), addAnnouncement)
  .get(getAnnouncements);
router.delete(
  '/announcement/:id',
  authenticateUser,
  authorizeRoles(['Mess Secretary', 'Mess Owner', 'Warden']),
  deleteAnnouncement,
);

router.get('/leaves_list', authenticateUser, getAllLeaves);
router.get('/filtered_leaves', authenticateUser, getTodaysLeaves);
router.put(
  '/leaves/takeAction/:id',
  authenticateUser,
  authorizeRoles(['Warden', 'Mess Owner']),
  leaveAction,
);

router.post(
  '/menu_upload',
  authenticateUser,
  authorizeRoles(['Mess Secretary', 'Mess Owner']),
  uploadMenu,
);
router.put('/menu/:id', authenticateUser, authorizeRoles(['Mess Secretary', 'Mess Owner']), updateMenu);
router.get('/getMenu', getMenu);

router.get('/feedback_list', authenticateUser, getFeedbacks);
router.get('/filtered_feedbacks', authenticateUser, getTodaysFeedbacks);

router.get('/getComplaints', authenticateUser, getComplaintsList);
router.get('/complaints/:id', authenticateUser, getSingleComplaint);
router.delete('/complaints/:id', authenticateUser, authorizeRoles(['Warden']), deleteComplaint);
router.put('/complaint/takeAction/:id', authenticateUser, authorizeRoles(['Warden']), takeAction);

export default router;
