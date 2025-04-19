import bcrypt from 'bcryptjs';

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