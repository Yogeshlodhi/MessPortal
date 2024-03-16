import adminModel from "../Models/adminModel.js"
import LeaveModel from "../Models/leaveApplicationModel.js"
import studentModel from "../Models/studentModel.js"
import {createToken, hashPassword} from '../Utils/createToken.js'
import bcrypt from 'bcryptjs'

const registerAdminService = async (registerData) => {
    
    try {
        const adminExists = await adminModel.findOne({emailId: registerData.emailId})
        if(adminExists){
            throw {message: "Admin Already Exists"}
        }
        const hashedPassword = await hashPassword(registerData.password);
        let admin = await adminModel.create(
            {
                ...registerData,
                password: hashedPassword
            }
        )
        if(admin){
            return{
                admin,
                token: createToken(admin._id)
            }
        }else{
            throw {message: 'Unexpected Error Occured'}
        }
    } catch (error) {
        console.log(error);
        throw {message: 'Could Not Register the Admin', error: error.message}
    }
}


const loginAdminService = async (loginData) => {
    let admin = await adminModel.findOne({emailId: loginData.emailId})

    if(!admin){
        throw {message: "Admin Does Not Exist, Please Login"}
    }

    const isPasswordValid = await bcrypt.compare(loginData.password,admin.password);
    if(admin && isPasswordValid){
        const {password, ...adminWithoutPassword} = admin.toObject();
        return adminWithoutPassword;
    }else{
        throw {message: "Couldn't Log You In, Please Try Again"}
    }
}

const getAllStudentsList = async () => {
    try {
        const students = await studentModel.find();
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
        throw {message: error.message}
    }
}

export{
    registerAdminService,
    loginAdminService,
    getAllStudentsList,
    getAllLeavesList,
}