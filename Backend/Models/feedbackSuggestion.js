import mongoose, { Schema } from "mongoose";
const feedBackSuggestion = new Schema(
    {
        feedback: {
            type: Number,
            required: true,
        },
        feedbackDescription: {
            type: String,
            required: true,
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
        },
        mealOfDay: {
            type: String,
            required: true,
            enum: ["Breakfast", "Lunch", "Dinner"],
        },
        // feedbackImage : {
        //     type: String,
        // }
        feedbackImage: {
            public_id: { type: String },
            url: { type: String },
        }
    },
    {
        timestamps: true,
    }
)

const feedbackModel = mongoose.model('FeedbackSubmission', feedBackSuggestion, 'Feedbacks')

export default feedbackModel;

