import mongoose, { Schema } from 'mongoose';

const {ObjectId} = mongoose.Schema.Types

const leaveApplicationSchema = new Schema({
    studentName: {
        type: ObjectId,
        ref: 'Students',
        required: true,
    },
    studentRoll: {
        type: ObjectId,
        ref: 'Students',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending","Approved","Rejected"],
        default: "Pending",
    }
})

const LeaveModel = mongoose.model('LeaveApplication',leaveApplicationSchema,'Leaves');

export default LeaveModel;