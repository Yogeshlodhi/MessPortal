import { Router } from "express";
import { getAllLeaves, getAllStudents, loginAdmin, registerAdmin } from "../Controllers/adminController.js";

const router = Router();

router.post('',registerAdmin);
router.post('/login',loginAdmin);

router.get('/students_list',getAllStudents);
router.get('/leaves_list',getAllLeaves);

export default router;