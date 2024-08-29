import mongoose, { Schema } from 'mongoose';

const {ObjectId} = mongoose.Schema.Types

const leaveApplicationSchema = new Schema({
    studentRoll: {
        // type: ObjectId,
        // ref: 'Students',
        // required: true,
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: [true, "Start Date Can Not Be Empty"],
        validate: {
            validator: function(value) {
                // current date and setting the time to midnight (00:00:00)
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Setting tomorrow's date by adding one day
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);

                // Checking if the startDate is at least tomorrow
                return value >= tomorrow;
            },
            message: "Start Date must be at least tomorrow."
        }
    },
    endDate: {
        type: Date,
        required: [true, "End Date Can Not Be Empty"],
    },
    reason: {
        type: String,
        required: [true, "Application Can't be processed without providing reason"],
        maxlength: [500, "Please keep the reason short within valid limit of 500 characters"]
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