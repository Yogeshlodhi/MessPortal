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
    updateProfileImage
} from "../Controllers/studentController.js";
import verifyToken from "../Middleware/verifyToken.js";
import { getAllLeaves } from "../Controllers/leaveController.js";
import { upload } from "../Middleware/multer.js";
import { getMessInfo } from "../Controllers/adminController.js";

const router = Router();

router
    .route('')
    .post(registerStudent)
    .get(verifyToken, getProfile)
    // .put(verifyToken, upload.single('image'), updateProfileImage)
    .put(verifyToken, updateProfile)

router.put('/updateImage',verifyToken, upload.single('image'), updateProfileImage)

router.get('/messInfo', getMessInfo)

router.get('/leaves',verifyToken, getAllLeaves);

router.post('/login', loginStudent);
router.post('/submitFeedback', verifyToken, upload.single('image'), submitFeedback);
// router.post('/submitFeedback', verifyToken, submitFeedback);
router.post('/raise_complaint', verifyToken, upload.single('image'), addComplaint)
// router.post('/raise_complaint', verifyToken, addComplaint)
router.get('/announcements', verifyToken, getAnnouncements)
router.get('/getMenu', verifyToken, getMenu)


export default router;