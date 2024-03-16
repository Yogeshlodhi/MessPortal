import jwt from 'jsonwebtoken';
import {statusCode} from '../Utils/http.js';
import studentModel from '../Models/studentModel.js';

const verifyToken = async (req,res,next) => {
    const token = req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        try {
            let tokenValue = token.split(' ')[1];
            const decoded = jwt.verify(tokenValue,process.env.JWT_SECRET);
            console.log(decoded)
            req.user = await studentModel.findById(decoded.data).select('-password');
            if(!req.user){
                res
                    .status(statusCode.notFound)
                    .send({message: 'Student Not Found'})
            }
            next();
        } catch (error) {
            return res
                    .status(statusCode.unauthorized)
                    .send({message: 'Token Not Verified, Unauthorized'})
        }
    }
    else{
        return res
                .status(statusCode.notFound)
                .send({message: 'No Auth No Token'})
    }
}

export default verifyToken