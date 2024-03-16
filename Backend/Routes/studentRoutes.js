import { Router } from "express";
import { getProfile, getStudentByRoll, loginStudent, registerStudent } from "../Controllers/studentController.js";
import verifyToken from "../Middleware/verifyToken.js";
import { getAllLeaves } from "../Controllers/leaveController.js";

const router = Router();

router
    .route('')
    .post(registerStudent)
    .get(verifyToken, getProfile)

router.get('/leaves',verifyToken, getAllLeaves);

router.get('/:id',verifyToken, getStudentByRoll);

router.post('/login', loginStudent);


export default router;