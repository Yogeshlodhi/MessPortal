import { complaintService, feedbackAndSuggestion, getAnnouncementsService, getMenuService, getProfileService, studentLogin, studentRegister, updateProfileService } from '../Services/studentService.js';
import { statusCode } from '../Utils/http.js';

const registerStudent = (req, res) => {

    const { emailId, studentName } = req.body;

    if (!emailId || !studentName) {
        res
            .status(statusCode.badRequest)
            .send({ message: 'Please input the email and Student Name' })
    }

    let studentData = req.body;
    studentRegister(studentData)
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Student Registered', data: data })
        })
        .catch((error) => {
            console.log(error)
            return res
                .status(statusCode.badRequest)
                .send({ message: 'Bad Request', error: error.message })
        })
}

const loginStudent = (req, res) => {
    const loginData = req.body;
    studentLogin(loginData)
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: "Student Logged In", data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const getProfile = (req, res) => {
    const userId = req.user.id;
    getProfileService(userId)
        .then((data) => {
            return res
                .status(statusCode.found)
                .send({ message: 'Student Profile Found', data: data })
        })
        return res
            .status(statusCode.badRequest)
            .send({message: err.message})
}

const submitFeedback = (req, res) => {
    let feedbackData = req.body;
    const studentId = req.user.id;
    feedbackAndSuggestion(feedbackData, studentId)
        .then((data) => {
            return res
                    .status(statusCode.ok)
                    .send({message: 'FeedBack Submitted', data: data})
        })
        .catch((err) => {
            return res
                    .status(statusCode.badRequest)
                    .send({message: 'Bad Request', error: err.message})
        })
}

const addComplaint = (req, res) => {
    const complaintData = req.body;
    const studentId = req.user.id;

    complaintService(complaintData, studentId)
        .then((data) => {
            return res
                    .status(statusCode.created)
                    .send({message: "Complaint Raised", data: data})
        })
        .catch((err) => {
            return res
                    .status(statusCode.badRequest)
                    .send({message: err.message})
        })
}

const getAnnouncements = (req, res) => {
    getAnnouncementsService()
        .then((data) => {
            return res
                     .status(statusCode.ok)
                     .send({message: 'Announcements Received', data: data})
        })
        .catch((err) => {
            return res
            .status(statusCode.badRequest)
            .send({message: err.message})
        })
}

const getMenu = (req, res) => {
    getMenuService()
        .then((data) => {
            return res 
                    .status(statusCode.ok)
                    .send({message: 'Menu Details Received', data: data})
        })
}

const updateProfile = (req, res) => {
    const userId = req.user.id
    const profileData = req.body

    updateProfileService(userId, profileData)
        .then((data) => {
            return res
                    .status(statusCode.ok)
                    .send({message: 'Profile Updated Successfully', data: data})
        })
}

export {
    registerStudent,
    loginStudent,
    getProfile,
    submitFeedback,
    addComplaint,
    getAnnouncements,
    getMenu,
    updateProfile,
}