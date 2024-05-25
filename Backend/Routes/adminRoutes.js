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
    getFeedbacks
} from "../Controllers/adminController.js";

const router = Router();

router.post('',registerAdmin);
router.post('/login',loginAdmin);

router.get('/students_list',getAllStudents);
router.get('/leaves_list',getAllLeaves);
router.get('/student_profile',getStudentByEmail);

router.post('/menu_upload', uploadMenu)
router.put('/menu/:month', updateMenu)

router.get('/feedback_list', getFeedbacks);

router.post('/announcement', addAnnouncement);

export default router;