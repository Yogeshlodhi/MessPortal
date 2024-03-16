import { Router } from "express";
import { getProfile, loginStudent, registerStudent } from "../Controllers/studentController.js";
import verifyToken from "../Middleware/verifyToken.js";

const router = Router();

router
    .route('')
    .post(registerStudent)
    .get(verifyToken,getProfile);
router.post('/login',loginStudent);


export default router;