import mongoose, { Schema } from 'mongoose';

const {ObjectId} = mongoose.Schema.Types

const leaveApplicationSchema = new Schema({
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
    appliedDate: { 
        type: Date, 
        default: Date.now 
    },
    status: {
        type: String,
        enum: ["Pending","Approved","Rejected"],
        default: "Pending",
    },
    actionTakenBy:{
        type: String,
    }
})

const LeaveModel = mongoose.model('LeaveApplication',leaveApplicationSchema,'Leaves');

export default LeaveModel;