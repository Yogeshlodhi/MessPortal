import { Router } from "express";
import { applyLeave } from "../Controllers/leaveController.js";
import verifyToken from "../Middleware/verifyToken.js";

const router = Router();

router.post('',verifyToken, applyLeave);

export default router;