import { loginAdminService, registerAdminService } from '../Services/adminService.js';
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
}

export{
    registerAdmin,
    loginAdmin,
}