import { announcementService, getAllLeavesList, getAllStudentsList, loginAdminService, registerAdminService, uploadMenuService } from '../Services/adminService.js';
import {statusCode} from '../Utils/http.js';

const registerAdmin = (req,res) => {
    let registerData = req.body;
    if(!registerData.emailId || !registerData.firstName || !registerData.password){
        res 
            .status(statusCode.badRequest)
            .send({message: 'Please Fill in All the required Fields'});
    }

    registerAdminService(registerData)
        .then((data) => {
            return res
                    .status(statusCode.created)
                    .send({message: "Admin Registered", data : data})
        })
        .catch((error) => {
            console.log(error)
            return res
                    .status(statusCode.badRequest)
                    .send({message: 'Bad Request', error: error.message})
        })
}

const loginAdmin = (req,res) => {
    const loginData = req.body;
    if(loginData){
        loginAdminService(loginData)
            .then((data) => {
                return res
                        .status(statusCode.found)
                        .send({message: "Admin Logged In",data: data})
            })
            .catch((err) => {
                console.log(err);
                return res
                        .status(statusCode.notFound)
                        .send({message: err.message})
            })
    }
    else{
        return res
                  .status(statusCode.incorrectCredential)
                  .send({message: err.message})
    }
}

const getAllStudents = (req,res) => {
    getAllStudentsList()
        .then((data) => {
            return res
                    .status(statusCode.found)
                    .send({message: 'List Received', StudentsList: data})
        })
        .catch((err) => {
            return res
                    .status(statusCode.notFound)
                    .send({message: err.message})
        })
}

const getAllLeaves = (req,res) => {
    getAllLeavesList()
        .then((data) => {
            return res 
                    .status(statusCode.found)
                    .send({message: 'Leaves List Received',LeavesList: data})
        })
        .catch((err) => {
            return res
                    .status(statusCode.badRequest)
                    .send({message: err.message})
        })
}

const uploadMenu = (req, res) => {
    const menuData = req.body;
    uploadMenuService(menuData)
        .then((data) => {
            return res
                     .status(statusCode.ok)
                     .send({message: "Menu Uploaded", data: data})
        })
        .catch((err) => {
            return res.status(statusCode.badRequest).send({message: err.message})
        })
}

const addAnnouncement = (req, res) => {
    const announcementData = req.body;
    announcementService(announcementData)
        .then((data) => {
            if(!data){
            return res
                    .status(statusCode.badRequest)
                    .send({message: "Unexpected Error Occurred"})  
            }
            return res
                    .status(statusCode.created)
                    .send({message: "Announcement Created", data: data})
        })
        .catch((err) => {
            return res
                    .status(statusCode.badRequest)
                    .send({message: err.message})
        })
}

export{
    registerAdmin,
    loginAdmin,
    getAllStudents,
    getAllLeaves,
    uploadMenu,
    addAnnouncement,
}