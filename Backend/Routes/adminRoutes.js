import { Router } from "express";
import { 
    getAllLeaves, 
    getAllStudents, 
    loginAdmin, 
    registerAdmin,
    uploadMenu,
    addAnnouncement
} from "../Controllers/adminController.js";

const router = Router();

router.post('',registerAdmin);
router.post('/login',loginAdmin);

router.get('/students_list',getAllStudents);
router.get('/leaves_list',getAllLeaves);

router.post('/menu_upload', uploadMenu)
router.post('/announcement', addAnnouncement);

export default router;