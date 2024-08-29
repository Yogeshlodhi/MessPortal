import { Router } from "express";
import { applyLeave } from "../Controllers/leaveController.js";
import  {isAuthenticatedUser} from "../Utils/auth.js";

const router = Router();

router.post('',isAuthenticatedUser, applyLeave);

export default router;