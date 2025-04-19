import { Router } from "express";
import { 
    addComplaint,
    getProfile, 
    loginStudent, 
    registerStudent, 
    submitFeedback,
    getAnnouncements,
    getMenu,
    updateProfile,
    logout
} from "../Controllers/studentController.js";
import { getAllLeaves } from "../Controllers/leaveController.js";
import { getMessInfo } from "../Controllers/adminController.js";
import  {isAuthenticatedUser} from "../Utils/auth.js";

const router = Router();

router
.route('')
.post(registerStudent)
.get(isAuthenticatedUser, getProfile)
.put(isAuthenticatedUser, updateProfile)

router.route('/logout').get(logout)
router.post('/login', loginStudent);

router.get('/messInfo', getMessInfo)
router.post('/submitFeedback', isAuthenticatedUser, submitFeedback);
router.post('/raise_complaint', isAuthenticatedUser, addComplaint)
router.get('/announcements', isAuthenticatedUser, getAnnouncements)
router.get('/getMenu', isAuthenticatedUser, getMenu)
router.get('/leaves',isAuthenticatedUser, getAllLeaves);

export default router;