// import { Router } from "express";
// import { 
//     getAllLeaves, 
//     getAllStudents, 
//     loginAdmin, 
//     registerAdmin,
//     uploadMenu,
//     addAnnouncement,
//     updateMenu,
//     getStudentByEmail,
//     getFeedbacks,
//     getAnnouncements,
//     deleteAnnouncement,
//     getMenu,
//     getComplaintsList,
//     takeAction
// } from "../Controllers/adminController.js";
// import authenticateAndCheckRole from "../Middleware/userPermission.js";



// const router = Router();

// router.post('',registerAdmin);
// router.post('/login',loginAdmin);

// router.get('/students_list',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), getAllStudents);
// router.get('/leaves_list',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), getAllLeaves);
// router.get('/student_profile',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), getStudentByEmail);

// router.post('/menu_upload',authenticateAndCheckRole(["Warden", "Mess Owner"]), uploadMenu)
// router.put('/menu/:month',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), updateMenu)

// router.get('/feedback_list',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), getFeedbacks);
// router.get('/getMenu',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), getMenu)
// router.get('/getComplaints',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), getComplaintsList)

// router.put('/complaint/takeAction/:id',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), takeAction)

// router
//     .route('/announcement')
//         .post(authenticateAndCheckRole(["Mess Secretary", "Mess Owner"]),addAnnouncement)
//         .get(authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), getAnnouncements)

// router.delete('/announcement/:id',authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]), deleteAnnouncement);


// export default router;

import { Router } from "express";
import { 
    getAllLeaves, 
    getAllStudents, 
    loginAdmin, 
    registerAdmin,
    uploadMenu,
    addAnnouncement,
    updateMenu,
    getStudentByEmail,
    getFeedbacks,
    getAnnouncements,
    deleteAnnouncement,
    getMenu,
    getComplaintsList,
    takeAction,
    getSingleComplaint
} from "../Controllers/adminController.js";
import authenticateAndCheckRole from "../Middleware/userPermission.js";

const router = Router();

// Public routes
router.post('', registerAdmin);
router.post('/login', loginAdmin);

// Middleware groups
const wardenOrHigher = authenticateAndCheckRole(["Warden", "Mess Secretary", "Mess Owner"]);
const messSecretaryOrHigher = authenticateAndCheckRole(["Mess Secretary", "Mess Owner"]);

router.route('/announcement')
        .post(messSecretaryOrHigher, addAnnouncement)
        .get(getAnnouncements);

        
// Routes
router.use(wardenOrHigher);

router.get('/students_list', getAllStudents);
router.get('/leaves_list', getAllLeaves);
router.get('/student_profile', getStudentByEmail);

router.post('/menu_upload', messSecretaryOrHigher, uploadMenu);
router.put('/menu/:month', updateMenu);

router.get('/feedback_list', getFeedbacks);
router.get('/getMenu', getMenu);
router.get('/getComplaints', getComplaintsList);

router.put('/complaint/takeAction/:id', takeAction);
router.get('/complaints/:id', getSingleComplaint);


router.delete('/announcement/:id',authenticateAndCheckRole(["Warden", "Mess Secretary"]), deleteAnnouncement);

export default router;
