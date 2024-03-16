import studentModel from "../Models/studentModel.js";
import { createToken, hashPassword } from "../Utils/createToken.js";
import bcrypt from 'bcryptjs';

const studentRegister = async (registrationData) => {

    try {
        const studentExists = await studentModel.findOne({ emailId: registrationData.emailId });
        if (studentExists) {
            throw { message: 'Student Already Exists, Please Login' };
        }

        const hashedPassword = await hashPassword(registrationData.password);
        const student = await studentModel.create(
            {
                emailId: registrationData.emailId,
                studentName: registrationData.studentName,
                studentRoll: registrationData.studentRoll,
                number: registrationData.number,
                password: hashedPassword,
            }
        )
        let jwtToken = createToken(student._id);
        const {password, ...studentDataWithoutPassword} = student.toObject();
        if (student) {
            return {
                ...studentDataWithoutPassword,
                token: jwtToken,
            };
        } else {
            throw { message: 'Unexpected Error Occured' };
        }
    } catch (error) {
        console.log(error);
        throw { message: error.message };
    }
}

const studentLogin = async (loginData) => {
    let student = await studentModel.findOne({ emailId: loginData.emailId })
    
    if (!student) {
        throw { message: "Student Not Found, Please Sign Up" };
    }
    const isPasswordValid = await bcrypt.compare(loginData.password, student.password);
    
    let jwtToken = createToken(student._id);
    console.log(jwtToken);
    if (student && isPasswordValid) {
        const { password, ...studentDataWithoutPassword } = student.toObject();
        return {
            ...studentDataWithoutPassword,
            token: jwtToken
        };
    } else {
        throw {message: "Invalid Credentials"}
    }
}

export {
    studentRegister,
    studentLogin
}