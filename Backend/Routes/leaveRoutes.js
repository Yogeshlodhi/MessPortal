import { Router } from "express";
import { applyLeave } from "../Controllers/leaveController.js";

const router = Router();

router.post('',applyLeave);

export default router;