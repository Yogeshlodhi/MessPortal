import mongoose, { Schema } from 'mongoose';

const leaveApplicationSchema = new Schema(
  {
    studentRoll: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start Date Can Not Be Empty'],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          return value >= tomorrow;
        },
        message: 'Start Date must be at least tomorrow.',
      },
    },
    endDate: {
      type: Date,
      required: [true, 'End Date Can Not Be Empty'],
      validate: {
        validator: function (value) {
          return !this.startDate || value >= this.startDate;
        },
        message: 'End Date must be on or after the Start Date.',
      },
    },
    reason: {
      type: String,
      required: [true, "Application Can't be processed without providing reason"],
      maxlength: [500, 'Please keep the reason short within valid limit of 500 characters'],
      trim: true,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    actionTakenBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// A student's own history is queried by roll + newest first.
leaveApplicationSchema.index({ studentRoll: 1, appliedDate: -1 });
// Admin "today's leaves" / status-filtered lists.
leaveApplicationSchema.index({ appliedDate: -1 });
leaveApplicationSchema.index({ status: 1, appliedDate: -1 });

const LeaveModel = mongoose.model('LeaveApplication', leaveApplicationSchema, 'Leaves');

export default LeaveModel;
