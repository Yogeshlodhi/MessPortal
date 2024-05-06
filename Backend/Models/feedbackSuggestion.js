import mongoose, {Schema} from "mongoose";
const feedBackSuggestion = new Schema(
    {
        feedback: {
            type: Number,
        },
        feedbackDescription: {
            type: String,
        },
        suggestion: {
            type: String,
        },
        submissionDate: {
            type: Date,
            default: Date.now
        },
        student: {
            type: String,
        },
        studentRoll: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const feedbackModel = mongoose.model('FeedbackSubmission', feedBackSuggestion, 'Feedbacks')

export default feedbackModel;

