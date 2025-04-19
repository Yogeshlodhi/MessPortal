import { Router } from "express";
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
    updateMessInfo
} from "../Controllers/adminController.js";
import { authenticateUser, authorizeRoles } from '../Middleware/userPermission.js'

const router = Router();

router.post('', registerAdmin);
router.post('/addAdmin', authenticateUser, authorizeRoles(["Warden"]), addAdmin);
router.post('/login', loginAdmin);
router.route('/logout').get(logout)

router.route('/messInfo')
    .post(authenticateUser, authorizeRoles(["Warden", "Mess Secretary", "Mess Owner"]), addMessInfo)
    .get(getMessInfo)
router.put('/messInfo/:id', authenticateUser, authorizeRoles(["Warden"]), updateMessInfo);

    
router.post('/messInfo/addContact/:id', authenticateUser, authorizeRoles(["Mess Secretary", "Mess Owner"]), addContact)

router.get('/students_list', getAllStudents);


router.route('/announcement')
    .post(authenticateUser, authorizeRoles(["Mess Secretary"]),addAnnouncement)
    .get(getAnnouncements);
    
router.get('/leaves_list', getAllLeaves);
router.get('/filtered_leaves', getTodaysLeaves);
router.put('/leaves/takeAction/:id',authenticateUser, authorizeRoles(["Warden","Mess Owner"]), leaveAction);
router.post('/menu_upload', authenticateUser, authorizeRoles(["Mess Secretary","Mess Owner"]), uploadMenu);
router.put('/menu/:id',authenticateUser, authorizeRoles(["Mess Secretary","Mess Owner"]), updateMenu);
router.get('/student_profile', getStudentByEmail);
router.get('/feedback_list', getFeedbacks);
router.get('/getMenu', getMenu);
router.get('/filtered_feedbacks', getTodaysFeedbacks);
router.delete('/announcement/:id', authenticateUser, authorizeRoles(["Mess Secretary","Mess Owner", "Warden"]), deleteAnnouncement);
router.get('/getComplaints', getComplaintsList);
router.delete('/complaints/:id', authenticateUser, authorizeRoles(["Warden"]), deleteComplaint);
router.put('/complaint/takeAction/:id',authenticateUser, authorizeRoles(["Warden"]), takeAction);
router.get('/complaints/:id', getSingleComplaint);


export default router;
