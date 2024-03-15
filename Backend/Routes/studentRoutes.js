import { Router } from "express";
import { loginStudent, registerStudent } from "../Controllers/studentController.js";

const router = Router();

router.post('',registerStudent);
router.post('/login',loginStudent);

export default router;