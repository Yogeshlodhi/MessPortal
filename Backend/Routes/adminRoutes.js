import { Router } from "express";
import { loginAdmin, registerAdmin } from "../Controllers/adminController.js";

const router = Router();

router.post('',registerAdmin);
router.post('/login',loginAdmin);

export default router;