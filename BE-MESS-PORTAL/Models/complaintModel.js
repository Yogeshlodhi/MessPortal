import mongoose, { Schema } from 'mongoose';

const complaintSchema = new Schema(
  {
    complaintAbout: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    student: {
      type: String,
    },
    roll: {
      type: String,
      uppercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Solved', 'In Progress', 'Pending', 'Rejected'],
      default: 'Pending',
    },
    actionBy: {
      type: String,
    },
    attachment: {
      public_id: { type: String },
      url: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

// Admin list: filter by status, newest first.
complaintSchema.index({ status: 1, createdAt: -1 });
complaintSchema.index({ createdAt: -1 });
// Search across subject/description/roll.
complaintSchema.index({ complaintAbout: 'text', description: 'text', roll: 'text' });

const complaintModel = mongoose.model('ComplaintModel', complaintSchema, 'Complaints');

export default complaintModel;
