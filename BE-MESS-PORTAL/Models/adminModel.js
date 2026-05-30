import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../Utils/createToken.js';

const adminSchema = new Schema(
  {
    emailId: {
      type: String,
      required: [true, 'Please Provide Your EmailId'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'Please Provide Your Firstname'],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // never returned unless explicitly selected (e.g. login)
    },
    adminType: {
      type: String,
      required: true,
      enum: ['Warden', 'Mess Secretary', 'Mess Owner', 'Other'],
    },
  },
  {
    timestamps: true,
  },
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const adminModel = mongoose.model('Admin', adminSchema, 'Admins');

export default adminModel;
