import { studentByRoll, studentLogin, studentRegister } from '../Services/studentService.js';
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
    // console.log("Login Data : ",loginData)

    studentLogin(loginData)
        .then((data) => {
            return res
                // .status(statusCode.found)
                .status(statusCode.ok)
                .send({ message: "Student Logged In", data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.notFound)
                .send({ message: err.message })
        })
}

const getProfile = (req, res) => {
    return res
        .status(statusCode.found)
        .send({ message: 'Student Profile Found', student: req.user })
}

const getStudentByRoll = (req, res) => {
    const roll = req.params.id;
    studentByRoll(roll)
        .then((data) => {
            return res
                    .status(statusCode.found)
                    .send({message: 'Student Found', StudentProfile: data})
        })
        .catch((err) => {
            return res
                    .status(statusCode.notFound)
                    .send({message: err.message})
        })
}

export {
    registerStudent,
    loginStudent,
    getProfile,
    getStudentByRoll,
}