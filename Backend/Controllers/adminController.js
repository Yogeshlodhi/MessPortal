import {
    addMessInfoService,
    announcementService,
    complaintActionService,
    complaintListService,
    deleteAnnounceService,
    deleteComplaintService,
    getAllLeavesList,
    getAlldata,
    getAnnounceService,
    getFeedbackService,
    getMenuService,
    getMessInfoService,
    getSingleComplaintService,
    getStudentByEmailService,
    getTodaysFeedbackService,
    getTodaysLeavesList,
    leaveActionService,
    loginAdminService,
    registerAdminService,
    updateMenuService,
    uploadMenuService
} from '../Services/adminService.js';
import { statusCode } from '../Utils/http.js';

const registerAdmin = (req, res) => {
    let registerData = req.body;
    if (!registerData.emailId || !registerData.firstName || !registerData.password) {
        res
            .status(statusCode.badRequest)
            .send({ message: 'Please Fill in All the required Fields' });
    }

    registerAdminService(registerData)
        .then((data) => {
            return res
                .status(statusCode.created)
                .send({ message: "Admin Registered", data: data })
        })
        .catch((error) => {
            console.log(error)
            return res
                .status(statusCode.badRequest)
                .send({ message: 'Bad Request', error: error.message })
        })
}

const loginAdmin = (req, res) => {
    const loginData = req.body;
    if (loginData) {
        loginAdminService(loginData)
            .then((data) => {
                return res
                    .status(statusCode.ok)
                    .send({ message: "Admin Logged In", data: data })
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(statusCode.badRequest)
                    .send({ message: err.message })
            })
    }
    else {
        return res
            .status(statusCode.incorrectCredential)
            .send({ message: err.message })
    }
}

const addMessInfo = (req, res) => {
    const messData = req.body;
    if (messData) {
        addMessInfoService(messData)
            .then((data) => {
                // console.log(data)
                return res
                    .status(statusCode.ok)
                    .send({ message: "Mess Information Added", data: data })
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(statusCode.badRequest)
                    .send({ message: err.message })
            })
    }
    else {
        return res
            .status(statusCode.incorrectCredential)
            .send({ message: err.message })
    }

}

const getMessInfo = (req, res) => {
    getMessInfoService()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: "Mess Information Received", data: data })
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const getAllStudents = (req, res) => {
    getAlldata()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'List Received', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const getAllLeaves = (req, res) => {
    getAllLeavesList()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Leaves List Received', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const getTodaysLeaves = (req, res) => {
    getTodaysLeavesList()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: "Today's Leaves List Received", data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}


const leaveAction = (req, res) => {
    const id = req.params.id;
    const actions = req.body;
    const user = req.user.firstName;
    leaveActionService(id, actions, user)
        .then((data) => {
            // console.log(data)
            return res
                .status(statusCode.ok)
                .send({ message: 'Action Updated Successfully', data: data });
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message, error: 'There is some error' })
        })
}

const uploadMenu = (req, res) => {
    const menuData = req.body;
    uploadMenuService(menuData)
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: "Menu Uploaded", data: data })
        })
        .catch((err) => {
            return res.status(statusCode.badRequest).send({ message: err.message })
        })
}

const updateMenu = (req, res) => {
    const month = req.params.month;
    const updatedMenu = req.body;

    updateMenuService(updatedMenu, month)
        .then((data) => {
            return res.status(statusCode.ok).send({ message: `Menu updated successfully`, data: data });
            // return res.status(statusCode.ok).send({ message: `Menu for the month ${month} updated successfully`, data: data });
        })
        .catch((err) => {
            console.log(err);
            return res.status(statusCode.badRequest).send({ message: err.message });
        });
}

// const updateMenu = (req, res) => {
//     const month = req.params.month;
//     const updatedMenu = req.body;

//     updateMenuService(updatedMenu, month)
//         .then((data) => {
//             if (!data) {
//                 return res.status(statusCode.badRequest).send({ message: 'Menu for the specified month not found' });
//             }
//             return res
//                 .status(statusCode.ok)
//                 .send({ message: `Menu for the month ${month} updated successfully`, data: data })
//         })
//         .catch((err) => {
//             console.log(err);
//             return res.status(statusCode.badRequest).send({ message: err.message })
//         })

// }

const addAnnouncement = (req, res) => {
    const announcementData = req.body;
    announcementService(announcementData)
        .then((data) => {
            if (!data) {
                return res
                    .status(statusCode.badRequest)
                    .send({ message: "Unexpected Error Occurred" })
            }
            return res
                .status(statusCode.created)
                .send({ message: "Announcement Created", data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const getAnnouncements = (req, res) => {
    getAnnounceService()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Announcements List Found', data: data });
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const getStudentByEmail = (req, res) => {
    const { emailId } = req.query;
    getStudentByEmailService(emailId)
        .then((data) => {
            if (!data) {
                return res.status(statusCode.notFound).send({ message: "There's some error getting this Student's Details" });
            }
            return res
                .status(statusCode.ok)
                .send({ message: `Student Data Received for ${emailId}`, data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const getFeedbacks = (req, res) => {
    getFeedbackService()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Feedbacks Received', data: data });
        })
        .catch((err) => {
            return res.status(statusCode.badRequest).send({ message: err.message })
        })
}

const getTodaysFeedbacks = (req, res) => {
    getTodaysFeedbackService()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Today\'s Feedbacks Received', data: data });
        })
        .catch((err) => {
            return res.status(statusCode.badRequest).send({ message: err.message })
        })
}

const deleteAnnouncement = (req, res) => {
    const { id } = req.params;
    deleteAnnounceService(id)
        .then((data) => {
            return res
                .status(statusCode.ok)
                .json({ message: 'Announcement Deleted', data: data });
        })
        .catch((err) => {
            console.error(err);
            return res
                .status(statusCode.badRequest)
                .json({ message: err.message });
        });
};

const getMenu = (req, res) => {
    getMenuService()
        .then((data) => {
            if (!data) {
                return res
                    .status(statusCode.ok)
                    .send({ message: 'Menu Details Received', data: [] })
            }
            return res
                .status(statusCode.ok)
                .send({ message: 'Menu Details Received', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const getComplaintsList = (req, res) => {
    complaintListService()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Complaints List Received', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const deleteComplaint = (req, res) => {
    const id = req.params.id;
    deleteComplaintService(id)
        .then((data) => {
            if (!data) {
                return res
                    .status(statusCode.badRequest)
                    .send({ message: 'Error Occurred' })
            }
            return res
                .status(statusCode.ok)
                .send({ message: 'Complaint Deleted', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}



const takeAction = (req, res) => {
    const id = req.params.id;
    const actions = req.body;
    const user = req.user.firstName;
    // console.log(req.user);
    complaintActionService(id, actions, user)
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Action Updated Successfully', data: data });
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message, error: 'There is some error' })
        })
}

const getSingleComplaint = (req, res) => {
    const id = req.params.id;

    getSingleComplaintService(id)
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Complaint Received', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

export {
    registerAdmin,
    loginAdmin,
    getAllStudents,
    getAllLeaves,
    uploadMenu,
    updateMenu,
    addAnnouncement,
    getStudentByEmail,
    getFeedbacks,
    getAnnouncements,
    deleteAnnouncement,
    getMenu,
    getComplaintsList,
    takeAction,
    getSingleComplaint,
    leaveAction,
    addMessInfo,
    getMessInfo,
    deleteComplaint,
    getTodaysLeaves,
    getTodaysFeedbacks
}