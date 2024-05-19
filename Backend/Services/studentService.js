import studentModel from "../Models/studentModel.js";
import feedbackModel from '../Models/feedbackSuggestion.js'
import { createToken, hashPassword } from "../Utils/createToken.js";
import bcrypt from 'bcryptjs';
import complaintModel from "../Models/complaintModel.js";
import announcementModel from "../Models/announcementModel.js";
import menuModel from '../Models/menuModel.js';

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
                bankAccount: registrationData.bankAccount,
                ifsc: registrationData.ifsc
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
        // console.log(error);
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
    
    if (student && isPasswordValid) {
        const { password, bankAccount, ifsc, ...studentDataWithoutPassword } = student.toObject();
        return {
            ...studentDataWithoutPassword,
            bankAccount,
            ifsc,
            token: jwtToken
        };
    } else {
        throw {message: "Invalid Credentials"}
    }
}

const feedbackAndSuggestion = async (feedbackData, studentId) => {
    try {
        const student = await studentModel.findById(studentId)
        const newFeedback = new feedbackModel({
          student: student.studentName,
          studentRoll: student.studentRoll,
          ...feedbackData,
        });
    
        const savedFeedback = await newFeedback.save();
        return savedFeedback;
      } catch (error) {
        // console.error(error);
        throw {message: error.message}
      }
}

const complaintService = async (complaint, studentId) => {
    try{
        let student = await studentModel.findById(studentId);
        let Complaint = new complaintModel({
            ...complaint,
            student: student.studentName,
            roll: student.studentRoll
        })
        const savedComplaint = await Complaint.save();
        
        return savedComplaint;
    }catch(err){
        throw {message: err.message}
    }
}

const getAnnouncementsService = async () => {
    try {
        let announcements = await announcementModel.find({});
        return announcements;
    } catch (error) {
        throw {message: error.message}
    }
}

const getMenuService = async () => {
    try{
        const response = await menuModel.find();
        return response;
    }catch(err){
        throw {message: err.message}
    }
}

const updateProfileService = async (userId, profileData) => {
    try{
        if (profileData.password) {
            const hashedPassword = await hashPassword(profileData.password);
            profileData.password = hashedPassword;
        }

        const updatedUser = await studentModel.findByIdAndUpdate(userId, profileData, { new: true }).select('-password');

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser
    }catch(err){

    }
}

const getProfileService = async (userId) => {
    try {
        const user = await studentModel.findById(userId).select('-password'); 
        return user;
    } catch (err) {
        throw {message: err.message};
    }
};

export {
    studentRegister,
    studentLogin,
    feedbackAndSuggestion,
    complaintService,
    getAnnouncementsService,
    getMenuService,
    updateProfileService,
    getProfileService
}