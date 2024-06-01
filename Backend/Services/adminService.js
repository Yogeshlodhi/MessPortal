import adminModel from "../Models/adminModel.js"
import announcementModel from "../Models/announcementModel.js"
import LeaveModel from "../Models/leaveApplicationModel.js"
import menuModel from "../Models/menuModel.js"
import studentModel from "../Models/studentModel.js"
import feedbackModel from '../Models/feedbackSuggestion.js'
import { createToken, hashPassword } from '../Utils/createToken.js'
import bcrypt from 'bcryptjs'

const registerAdminService = async (registerData) => {

    try {
        const adminExists = await adminModel.findOne({ emailId: registerData.emailId })
        if (adminExists) {
            throw { message: "Admin Already Exists" }
        }
        const hashedPassword = await hashPassword(registerData.password);
        let admin = await adminModel.create(
            {
                ...registerData,
                password: hashedPassword
            }
        )
        if (admin) {
            return {
                admin,
                token: createToken(admin._id)
            }
        } else {
            throw { message: 'Unexpected Error Occured' }
        }
    } catch (error) {
        console.log(error);
        throw { message: 'Could Not Register the Admin', error: error.message }
    }
}

const loginAdminService = async (loginData) => {
    let admin = await adminModel.findOne({ emailId: loginData.emailId })

    if (!admin) {
        throw { message: "Admin Does Not Exist, Please Register" }
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, admin.password);
    if (admin && isPasswordValid) {
        const { password, ...adminWithoutPassword } = admin.toObject();
        return adminWithoutPassword;
    } else {
        throw { message: "Couldn't Log You In, Please Try Again" }
    }
}

const getAllStudentsList = async () => {
    try {
        const students = await studentModel.find().select('-password');
        return students;
    } catch (error) {
        console.log(error);
    }
}

const getAllLeavesList = async () => {
    try {
        //  Before Making Changes
        // const leaves = await LeaveModel.find();
        // return leaves;
        //  Before Making Changes

        //  After Making Changes

        const leaves = await LeaveModel.find().populate({
            path: 'studentRoll',
            model: studentModel,
            select: 'studentRoll studentName',
        });
        // console.log(leaves)
        const updatedLeaves = leaves.map(leave => ({
            _id: leave._id,
            studentRoll: leave.studentRoll ? leave.studentRoll.studentRoll : 'Student Does Not Exist Anymore',
            studentName: leave.studentRoll ? leave.studentRoll.studentName : 'Student Does Not Exist Anymore',
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason,
            status: leave.status,
            __v: leave.__v
        }));

        return updatedLeaves;
        //  After Making Changes
    } catch (error) {
        throw { message: error.message }
    }
}

const uploadMenuService = async (menuData) => {
    try {
        let menu = await menuModel.create(menuData);
        if (!menu) {
            throw { message: "Unexpected Error Occured" }
        }
        return menu;
    } catch (err) {
        console.log(err);
        throw { message: 'Could Not Upload the Menu', error: err }
    }
}

const updateMenuService = async (updatedMenuData, month) => {
    try {
        const menu = await menuModel.findOneAndUpdate(
            { monthOfMenu: month },
            updatedMenuData,
            { new: true, runValidators: true }
        );
        return menu;
    } catch (err) {
        console.log(err);
        throw { message: 'Could Not Update the Menu', error: err }
    }
}

const announcementService = async (announcementData) => {
    try {
        let announce = await announcementModel.create(announcementData);
        if (!announce) {
            throw { message: "Could Not Create Announcement" };
        }
        return announce;
    } catch (err) {
        console.log(err);
        throw { message: err.message }
    }
}

const getAnnounceService = async () => {
    try{
        const announcements = await announcementModel.find();
        return announcements;
    }catch(err){    
        console.log(err);
        throw {message: err.message}
    }
}

const deleteAnnounceService = async (id) => {
    try {
        return await announcementModel.deleteOne({ _id: id });
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
};

const getStudentByEmailService = async (webmail) => {
    try {
        const student = await studentModel.findOne({ emailId: webmail });
        const { password, ...studentDataWithoutPassword } = student.toObject();
        return {
            ...studentDataWithoutPassword,
        };
    } catch (err) {
        console.log(err);
        throw { message: err.message }
    }
}

const getFeedbackService = async () => {
    try {
        const feedbacks = await feedbackModel.find();
        return feedbacks;
        
    } catch (error) {
        throw { message: error.message }
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

export {
    registerAdminService,
    loginAdminService,
    getAllStudentsList,
    getAllLeavesList,
    uploadMenuService,
    updateMenuService,
    announcementService,
    getStudentByEmailService,
    getFeedbackService,
    getAnnounceService,
    deleteAnnounceService,
    getMenuService
}