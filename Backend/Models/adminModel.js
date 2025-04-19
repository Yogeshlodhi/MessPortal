import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new Schema({
    emailId: {
        type: String,
        required: [true, 'Please Provide Your EmailId'],
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please Provide Your Firstname'],
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    adminType: {
        type: String,
        required: true,
        enum: ["Warden", "Mess Secretary", "Mess Owner", "Other"],
    }
}, {
    timestamps: true,
})

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

const adminModel = mongoose.model("Admin", adminSchema, "Admins");

export default adminModel;
