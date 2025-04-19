import { complaintService, feedbackAndSuggestion, getAnnouncementsService, getMenuService, getMessInfoService, getProfileService, studentLogin, studentRegister, updateProfileService } from '../Services/studentService.js';
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
            const token = data.getJwtToken();
            const options = {
                expires: new Date(
                    Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            };

            return res
                .status(statusCode.created)
                .cookie('token', token, options)
                .send({ message: 'Student Registered', data: data })
        })
        .catch((error) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: error.message });
        })
}

const loginStudent = (req, res) => {
    const loginData = req.body;
    if (loginData) {
        studentLogin(loginData)
            .then((data) => {
                const token = data.getJwtToken();
                const options = {
                    expires: new Date(
                        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true, // Set to true for security, to prevent client-side access
                    secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
                    sameSite: 'None',
                    // httpOnly: false,
                };

                return res
                    .status(statusCode.ok)
                    .cookie('token', token, options)
                    .send({ message: "Student Logged In", data: data })
            })
            .catch((err) => {
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

const logout = (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(statusCode.ok).send({ message: 'Logged Out', success: true })
}

const getProfile = (req, res) => {
    const userId = req.user.id;
    getProfileService(userId)
        .then((data) => {
            return res
                .status(statusCode.found)
                .send({ message: 'Student Profile Found', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profileData = req.body;
        const avatarFile = req.files?.avatar; // Safely access avatar file

        const updatedUser = await updateProfileService(userId, profileData, avatarFile);
        res.status(statusCode.ok).json({ message: 'Profile Updated Successfully', data: updatedUser });
    } catch (err) {
        res.status(statusCode.badRequest).json({ message: err.message });
    }
};

const getMessInfo = (req, res) => {
    getMessInfoService()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: "Mess Information Received", data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

const submitFeedback = async (req, res) => {
    try {
        const studentId = req.user.id;
        const feedbackData = req.body;
        const feedbackImage = req.files?.feedbackImage
        const feedback = await feedbackAndSuggestion(feedbackData, studentId, feedbackImage);
        res.status(statusCode.ok).json({ message: 'Feedback Submitted Successfully', data: feedback });
    } catch (err) {
        res
            .status(statusCode.badRequest)
            .send({ message: 'Bad Request, Try Again', error: err.message })

    }
}

const addComplaint = async (req, res) => {
    try {
        const studentId = req.user.id;
        const complaintData = req.body;
        const complaintImage = req.files?.attachment
        const complaint = await complaintService(complaintData, studentId, complaintImage);
        res
            .status(statusCode.created)
            .send({ message: 'Complaint Submitted', data: complaint });
    } catch (err) {
        res
            .status(statusCode.badRequest)
            .send({ message: 'Bad Request, Try Again..', error: err.message })
    }
}

const getAnnouncements = (req, res) => {
    getAnnouncementsService()
        .then((data) => {
            return res
                .status(statusCode.ok)
                .send({ message: 'Announcements Received', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: err.message })
        })
}

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

export {
    registerStudent,
    loginStudent,
    getProfile,
    submitFeedback,
    addComplaint,
    getAnnouncements,
    getMenu,
    updateProfile,
    getMessInfo,
    logout
}