import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const expireDuration = 30 * 24 * 60 * 60;

export const createToken = (data) => {
    return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: expireDuration });
}

export const hashPassword = async (password) => {

    try {
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw { message: error.message };
    }
}