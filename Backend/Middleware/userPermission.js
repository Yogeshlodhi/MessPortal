import jwt from 'jsonwebtoken';
// import User from './models/user'; // Import your User model to fetch user details if necessary
import adminModel from '../Models/adminModel.js';
import { statusCode } from '../Utils/http.js';

// const authenticateAndCheckRole = (roles) => {
//     return async (req, res, next) => {
//         const token = req.header('Authorization')?.replace('Bearer ', '');

//         if (!token) {
//             return res.status(401).send({ message: 'No token provided' });
//         }

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
//             // Fetch the user details if needed for more granular checks
//             const user = await adminModel.findById(decoded.id);
//             console.log(user)
//             if (!user) {
//                 return res.status(401).send({ message: 'Invalid token' });
//             }

//             if (!roles.includes(user.role)) {
//                 return res.status(403).send({ message: 'Access denied' });
//             }

//             // Optionally, attach user to req for further use
//             // req.user = user;
            
//             next();
//         } catch (error) {
//             return res.status(401).send({ message: 'Invalid token' });
//         }
//     };
// };

const authenticateAndCheckRole = (adminType) => async (req,res,next) => {
    const token = req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        try {
            let tokenValue = token.split(' ')[1];
            const decoded = jwt.verify(tokenValue,process.env.JWT_SECRET);
            req.user = await adminModel.findById(decoded.data).select('-password');
            if(!req.user){
                return res
                        .status(statusCode.notFound)
                        .send({message: 'User Not Found'})
            }
            const adminRole = req.user.adminType;
            if (!adminRole || !adminType.includes(adminRole)) {
                return res
                        .status(403)
                        .send({ message: 'Access denied' });
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

export default authenticateAndCheckRole;
