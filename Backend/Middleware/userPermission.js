import jwt from 'jsonwebtoken';
import adminModel from '../Models/adminModel.js';

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) {
        return res.status(401).send({ message: "Please log in as authorized user to access this resource" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await adminModel.findById(decoded.id); // Attach user to request object

        if (!req.user) {
            return res.status(401).send({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Error in authenticateUser middleware:", error);
        return res.status(401).send({ message: "Authentication failed" });
    }
};

const authorizeRoles = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.adminType)) {
        return res.status(403).send({ message: `${req.user.adminType} is not allowed to access this resource` });
    }
    next();
};

export { authenticateUser, authorizeRoles };
