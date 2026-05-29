import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, 'Role of the Contact Required!'],
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Please provide the contact number of the person'],
      trim: true,
    },
    emailId: {
      type: String,
      required: [true, 'Please provide the Email Id of the person'],
      lowercase: true,
      trim: true,
    },
  },
  { _id: false },
);

const messInfoSchema = new Schema(
  {
    mealPrice: {
      type: Number,
      required: true,
    },
    contacts: [contactSchema],
    messOwner: {
      type: String,
      required: true,
      trim: true,
    },
    contractInfo: {
      type: String,
      required: true,
    },
    tenureStarts: {
      type: String,
      required: true,
    },
    tenureEnds: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// The current mess info is the most recently created record.
messInfoSchema.index({ createdAt: -1 });

const messInfoModel = mongoose.model('MessInfo', messInfoSchema, 'MessInformation');

export default messInfoModel;
