import { Router } from "express";
import { 
    addComplaint,
    getProfile, 
    loginStudent, 
    registerStudent, 
    submitFeedback,
    getAnnouncements
} from "../Controllers/studentController.js";
import verifyToken from "../Middleware/verifyToken.js";
import { getAllLeaves } from "../Controllers/leaveController.js";

const router = Router();

router
    .route('')
    .post(registerStudent)
    .get(verifyToken, getProfile)

router.get('/leaves',verifyToken, getAllLeaves);
router.post('/login', loginStudent);
router.post('/submitFeedback', verifyToken, submitFeedback);
router.post('/raise_complaint', verifyToken, addComplaint)
router.get('/announcements', verifyToken, getAnnouncements)


export default router;