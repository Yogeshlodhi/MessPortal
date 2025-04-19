import studentModel from "../Models/studentModel.js";
import feedbackModel from '../Models/feedbackSuggestion.js'
import { hashPassword } from "../Utils/createToken.js";
import bcrypt from 'bcryptjs';
import complaintModel from "../Models/complaintModel.js";
import announcementModel from "../Models/announcementModel.js";
import menuModel from '../Models/menuModel.js';
import messInfoModel from "../Models/messInfoModel.js";
import cloudinary from 'cloudinary';

const studentRegister = async (registrationData) => {

    try {
        const { emailId, studentName, studentRoll, number, password } = registrationData;
        const studentExists = await studentModel.findOne({ emailId });
        if (studentExists) {
            throw { message: 'Student Already Exists, Please Login' };
        }
        const student = await studentModel.create(
            {
                emailId,
                studentName,
                studentRoll,
                number,
                password,
            }
        )
        if (student) {
            student.password = undefined;
            return student;
        }
    } catch (error) {
        throw { message: error.message };
    }
}

const studentLogin = async (loginData) => {
    let student = await studentModel.findOne({ emailId: loginData.emailId }).select('+password')

    const isPasswordValid = await bcrypt.compare(loginData.password, student.password);
    if (!student || !isPasswordValid) throw {message: 'Invalid Credentials!, Please Recheck or Register'}
    else{
        student.password = undefined;
        return student;
    }
}

const getProfileService = async (userId) => {
    try {
        const user = await studentModel.findById(userId);
        if (!user) throw new Error('User Not Found');
        return user;
    } catch (err) {
        throw { message: err.message };
    }
};

const updateProfileService = async (userId, profileData, avatarFile) => {
    if (avatarFile) {
        // Destroy old avatar if it exists
        const user = await studentModel.findById(userId);
        if (user.avatar && user.avatar.public_id) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }

        // Upload new avatar
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                { folder: 'avatars', width: 250, crop: 'scale' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(avatarFile.data); // Pipe file buffer to Cloudinary
        });

        profileData.avatar = {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
        };
    }

    if (profileData.password) profileData.password = await hashPassword(profileData.password);

    const updatedUser = await studentModel.findByIdAndUpdate(userId, profileData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }).select('-password');

    if (!updatedUser) {
        throw new Error('User not found');
    }

    return updatedUser;
};


const getMessInfoService = async () => {
    try {
        const latestMessInfo = await messInfoModel.findOne().sort({ createdAt: -1 });
        return latestMessInfo;
    } catch (err) {
        console.log(err);
        throw { message: 'Could Not Find the Informations', error: err }
    }
}

const feedbackAndSuggestion = async (feedbackData, studentId, feedbackImage) => {
    try {
        if (feedbackImage) {
            // Upload the feedback image to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.v2.uploader.upload_stream(
                    { folder: 'feedbacks', width: 200, crop: 'scale' },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    }
                );
                stream.end(feedbackImage.data); // Pipe the file buffer to Cloudinary
            });

            feedbackData.feedbackImage = {
                public_id: uploadResult.public_id,
                url: uploadResult.secure_url,
            };
        }
        // Find the student by ID
        const student = await studentModel.findById(studentId);
        if (!student) {
            throw new Error('Student not found');
        }

        // Create a new feedback entry
        const newFeedback = new feedbackModel({
            student: student.studentName,
            studentRoll: student.studentRoll,
            ...feedbackData,
        });

        // Save the feedback to the database
        const savedFeedback = await newFeedback.save();
        return savedFeedback;
    } catch (error) {
        console.error('Feedback and Suggestion Error:', error);
        throw { message: error.message };
    }
};

const complaintService = async (complaint, studentId, complaintImage) => {
    try {
        if (complaintImage) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.v2.uploader.upload_stream(
                    { folder: 'complaints', width: 200, crop: 'scale' },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    }
                );
                stream.end(complaintImage.data); // Pipe the file buffer to Cloudinary
            });

            complaint.attachment = {
                public_id: uploadResult.public_id,
                url: uploadResult.secure_url,
            };
        }
        let student = await studentModel.findById(studentId);
        if (!student) {
            throw new Error('Student not found');
        }
        let Complaint = new complaintModel({
            ...complaint,
            student: student.studentName,
            roll: student.studentRoll
        })
        const savedComplaint = await Complaint.save();

        return savedComplaint;
    } catch (err) {
        throw { message: err.message }
    }
}

const getAnnouncementsService = async () => {
    try {
        let announcements = await announcementModel.find({});
        return announcements;
    } catch (error) {
        throw { message: error.message }
    }
}

const getMenuService = async () => {
    try {
        // const response = await menuModel.find();
        const response = await menuModel.findOne();
        return response;
    } catch (err) {
        throw { message: err.message }
    }
}

export {
    studentRegister,
    studentLogin,
    feedbackAndSuggestion,
    complaintService,
    getAnnouncementsService,
    getMenuService,
    updateProfileService,
    getProfileService,
    getMessInfoService,
}