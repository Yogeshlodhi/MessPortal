import jwt from 'jsonwebtoken';
import studentModel from '../Models/studentModel.js';


export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({ message: 'No token provided. Please login first.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await studentModel.findById(decoded.id);

        if (!req.user) {
            return res.status(401).send({ message: 'Invalid token. User not found.' });
        }

        next(); 
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).send({ message: 'Invalid token. Please login again.' });
    }
};

