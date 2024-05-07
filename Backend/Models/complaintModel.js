import mongoose,{Schema} from "mongoose";

const complaintSchema = new Schema({
    complaintAbout: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    student: {
        type: String,
    },
    roll: {
        type: String
    },
    // attachments: {

    // },
},
{
    timestamps: true
}
)

const complaintModel = new mongoose.model('ComplaintModel', complaintSchema, 'Complaints');

export default complaintModel;