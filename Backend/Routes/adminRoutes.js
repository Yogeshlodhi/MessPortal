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
    deleteComplaint
} from "../Controllers/adminController.js";
import authenticateAndCheckRole from "../Middleware/userPermission.js";

const router = Router();

// Public routes
router.post('', registerAdmin);
router.post('/login', loginAdmin);

// Middleware groups
const wardenOrHigher = authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]);
const messSecretaryOrHigher = authenticateAndCheckRole(["Mess Secretary", "Mess Owner"]);

router.route('/announcement')
        .post(messSecretaryOrHigher, addAnnouncement)
        .get(getAnnouncements);

        
// Routes
router.use(wardenOrHigher);

router.route('/messInfo')
        .post(addMessInfo)
        .get(getMessInfo)

router.get('/students_list', getAllStudents);
router.get('/leaves_list', getAllLeaves);
router.put('/leaves/takeAction/:id', leaveAction);
router.get('/student_profile', getStudentByEmail);

router.post('/menu_upload', messSecretaryOrHigher, uploadMenu);
router.put('/menu/:month', updateMenu);

router.get('/feedback_list', getFeedbacks);
router.get('/getMenu', getMenu);
router.get('/getComplaints', getComplaintsList);

router.put('/complaint/takeAction/:id', takeAction);
router.get('/complaints/:id', getSingleComplaint);


router.delete('/announcement/:id',authenticateAndCheckRole(["Mess Owner", "Mess Secretary"]), deleteAnnouncement);
router.delete('/complaints/:id',authenticateAndCheckRole(["Warden"]), deleteComplaint);

export default router;
