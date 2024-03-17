import mongoose, { Schema } from "mongoose";

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

const adminModel = mongoose.model("Admin", adminSchema, "Admins");

export default adminModel;
