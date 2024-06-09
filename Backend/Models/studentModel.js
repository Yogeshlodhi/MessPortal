import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
    {
        emailId: {
            type: String,
            unique: true,
            required: [true, 'Please add your institute email'],
        },
        studentName: {
            type: String,
            required: [true, 'Please Add Your Name'],
        },
        password: {
            type: String,
            required: [true, 'Please Add Password'],
        },
        studentRoll: {
            type: String,
        },
        number: {
            type: String,
        },
        bankAccount: {
            type: String,
            minlength: 10,
            maxlength: 20
        },
        ifsc: {
            type: String,
        },
        profileImage: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

// const userModel = mongoose.model("Users", userSchema, "yogesh");
const studentModel = mongoose.model("Students", studentSchema, "Student");

export default studentModel;