import adminModel from "../Models/adminModel.js"
import announcementModel from "../Models/announcementModel.js"
import LeaveModel from "../Models/leaveApplicationModel.js"
import menuModel from "../Models/menuModel.js"
import studentModel from "../Models/studentModel.js"
import feedbackModel from '../Models/feedbackSuggestion.js'
import bcrypt from 'bcryptjs'
import complaintModel from "../Models/complaintModel.js"
import messInfoModel from '../Models/messInfoModel.js'

const registerAdminService = async (registerData) => {

    try {
        const adminExists = await adminModel.findOne({ emailId: registerData.emailId })
        if (adminExists) {
            throw { message: "Admin Already Exists, Please Login" }
        }
        const admin = await adminModel.create(registerData);
        if (admin) {
            admin.password = undefined;
            return admin;
        }
    } catch (error) {
        console.log(error);
        throw { message: 'Could Not Register the Admin', error: error.message }
    }
}

const addAdminService = async (registerData) => {

    try {
        const adminExists = await adminModel.findOne({ emailId: registerData.emailId })
        if (adminExists) {
            throw { message: "Admin Already Exists" }
        }
        const admin = await adminModel.create(registerData);
        if (admin) {
            admin.password = undefined;
            return admin;
        }
    } catch (error) {
        console.log(error);
        throw { message: 'Could Not Create the Admin', error: error.message }
    }
}

const loginAdminService = async (loginData) => {
    let admin = await adminModel.findOne({ emailId: loginData.emailId })

    const isPasswordValid = await bcrypt.compare(loginData.password, admin.password);
    if (!isPasswordValid || !admin) {
        throw { message: 'Invalid Credentials!, Please Recheck or Register' }
    }
    else {
        admin.password = undefined;
        return admin;
    }
}

const addMessInfoService = async (messInfo) => {
    try {
        const info = await messInfoModel.create(messInfo);
        if (!info) throw new Error("Unexpected Error Occurred, Try Again Later!");
        return info;
    } catch (err) {
        // console.error("Error in addMessInfoService:", err);
        throw new Error('Could Not Upload the Information');
    }
};

const getMessInfoService = async () => {
    try {
        const latestMessInfo = await messInfoModel.findOne().sort({ createdAt: -1 });
        if (latestMessInfo) {
            return latestMessInfo
        } else {
            return {};
        }
    } catch (err) {
        console.log(err);
        throw { message: 'Could Not Find the Informations', error: err }
    }
}

const updateMessInfoService = async (messInfo, id) => {
    try {
        const info = await messInfoModel.findOneAndUpdate(
            { _id: id },
            messInfo,
            { new: true, runValidators: true, useFindAndModify: false }
        );
        return info;
    } catch (err) {
        console.log(err);
        throw { message: 'Could Not Update the Menu', error: err }
    }
}

const addMessinfoContact = async (newContact, id) => {
    try {
        const messInfo = await messInfoModel.findById({ _id: id });
        if (!messInfo) throw { message: 'No Information Exists Associated with this' }
        messInfo.contacts.push(newContact);
        await messInfo.save();

        return messInfo;
    } catch (err) {
        console.log(err);
        throw { message: 'Server Error', error: err }
    }
}


const getAlldata = async () => {
    try {
        const students = await studentModel.find().select('-password');
        return students;
    } catch (error) {
        console.log(error);
    }
}

const getAllLeavesList = async () => {
    try {
        const leaves = await LeaveModel.find();
        return leaves;
    } catch (error) {
        throw { message: error.message }
    }
}


const getTodaysLeavesList = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const leaves = await LeaveModel.find({ appliedDate: { $gte: today } })

        const updatedLeaves = leaves.map(leave => ({
            _id: leave._id,
            studentRoll: leave.studentRoll,
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason,
            status: leave.status,
            appliedDate: leave.appliedDate,
            __v: leave.__v,
            actionTakenBy: leave.actionTakenBy
        }));

        return updatedLeaves;
    } catch (error) {
        throw { message: error.message }
    }
}

const leaveActionService = async (id, actionData, user) => {
    try {
        actionData.actionTakenBy = user;
        const updatedLeave = await LeaveModel.findOneAndUpdate(
            { _id: id },
            actionData,
            { new: true, runValidators: true, useFindAndModify: false }
        );
        return updatedLeave;
    } catch (error) {
        throw { message: error.message }
    }
}

const uploadMenuService = async (menuData) => {
    try {
        let menu = await menuModel.create(menuData);
        if (!menu) throw { message: "Unexpected Error Occured, Please try again later!" }
        return menu;
    } catch (err) {
        console.log(err);
        throw { message: 'Could Not Upload the Menu', error: err }
    }
}

const updateMenuService = async (updatedMenuData, id) => {
    try {
        const menu = await menuModel.findOneAndUpdate(
            { _id: id },
            updatedMenuData,
            { new: true, runValidators: true, useFindAndModify: false }
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
        if (!announce) throw { message: "Could Not Create Announcement" };
        return announce;
    } catch (err) {
        console.log(err);
        throw { message: err.message }
    }
}

const getAnnounceService = async () => {
    try {
        const announcements = await announcementModel.find();
        return announcements;
    } catch (err) {
        console.log(err);
        throw { message: err.message }
    }
}

const getStudentByEmailService = async (webmail) => {
    try {
        const student = await studentModel.findOne({ emailId: webmail });
        return student;
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

const getTodaysFeedbackService = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to midnight to compare only the date part

        const feedbacks = await feedbackModel.find({ submissionDate: { $gte: today } }).limit(5); // Limit the results to a maximum of 5 feedbacks

        return feedbacks;
    } catch (error) {
        throw { message: error.message }
    }
}

const getMenuService = async () => {
    try {
        const response = await menuModel.findOne();
        // console.log(response)
        return response;
    } catch (err) {
        throw { message: err.message }
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

const complaintListService = async () => {
    try {
        const complaints = await complaintModel.find();
        return complaints;
    }
    catch (error) {
        throw { message: error.message }
    }
}

const complaintActionService = async (id, actionData, user) => {
    try {
        actionData.actionBy = user;
        const updatedComplaint = await complaintModel.findOneAndUpdate(
            { _id: id },
            actionData,
            { new: true, runValidators: true, useFindAndModify: false }
        );
        return updatedComplaint;
    } catch (error) {
        throw { message: error.message }
    }
}

const deleteComplaintService = async (id) => {
    try {
        return await complaintModel.findByIdAndDelete(id);
    } catch (error) {
        throw { message: error.message };
    }
}

const getSingleComplaintService = async (id) => {
    try {
        const complaint = await complaintModel.findById({ _id: id });
        return complaint;
    } catch (error) {
        throw { message: error.message };
    }
}

export {
    registerAdminService,
    loginAdminService,
    addAdminService,

    getAlldata,
    getAllLeavesList,
    uploadMenuService,
    updateMenuService,
    announcementService,
    getStudentByEmailService,
    getFeedbackService,
    getAnnounceService,
    deleteAnnounceService,
    getMenuService,
    complaintListService,
    complaintActionService,
    getSingleComplaintService,
    leaveActionService,
    addMessInfoService,
    getMessInfoService,
    addMessinfoContact,
    deleteComplaintService,
    getTodaysLeavesList,
    getTodaysFeedbackService,
    updateMessInfoService
}