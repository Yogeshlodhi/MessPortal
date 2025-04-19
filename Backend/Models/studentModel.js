import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const studentSchema = new Schema(
    {
        emailId: {
            type: String,
            unique: true,
            required: [true, 'Please add your institute email'],
            validate: {
                validator: function (v) {
                    // Regular expression to match the format: name_BATCHBRANCHROLL@iitp.ac.in
                    return /^[a-zA-Z]+\_[0-9]{4}(cb|cs|me|ce|ph|ee|mc|mm)[0-9]{2}@iitp\.ac\.in$/.test(v);
                },
                message: props => `${props.value} is not a valid institute email!`
            }
        },
        studentName: {
            type: String,
            required: [true, 'Please Add Your Name'],
            minlength: [4, "Your name can't be of less than 4 characters"],
            maxlength: [20, "Your name can't be of more than 20 characters"],
        },
        password: {
            type: String,
            required: [true, 'Please Add Your Password'],
            minlength: [6, 'Your password must be longer than 6 characters'],
            select: false, // to exclude it from queries
        },
        studentRoll: {
            type: String,
            required: [true,'Please Add Your Roll Number'],
            validate: {
                validator: function (v) {
                    // Regular expression to match the format: 2101CB61
                    return /^[0-9]{4}(CB|CS|ME|CE|PH|EE|MC|MM|AI)[0-9]{2}$/.test(v);
                },
                message: props => `${props.value} Roll Number is Invalid!`
            }
        },
        number: {
            type: String,
            required: [true, 'Please add your phone number'],
            validate: {
                validator: function(v) {
                    // Ensures the number consists of exactly 10 digits
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            minlength: [10, 'Phone number should be exactly 10 digits'],
            maxlength: [10, 'Phone number should be exactly 10 digits'],
        },
                
        bankAccount: {
            type: String,
            minlength: [10, 'Account Number should contain more than 10 digits'],
            maxlength: [20, 'Account Number should contain less than 20 digits'],
        },
        ifsc: {
            type: String,
            minlength: [10, 'IFSC code should contain more than 10 digits'],
        },
        profileImage: {
            type: String,
        },
        avatar: {
            public_id: {type: String},
            url: {type: String},
        }
    },
    {
        timestamps: true,
    }
)

studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

studentSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// const userModel = mongoose.model("Users", userSchema, "yogesh");
const studentModel = mongoose.model("Students", studentSchema, "Student");

export default studentModel;