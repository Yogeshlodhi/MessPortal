import { complaintService, feedbackAndSuggestion, getAnnouncementsService, studentLogin, studentRegister } from '../Services/studentService.js';
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
    return res
        .status(statusCode.found)
        .send({ message: 'Student Profile Found', student: req.user })
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

export {
    registerStudent,
    loginStudent,
    getProfile,
    submitFeedback,
    addComplaint,
    getAnnouncements
}