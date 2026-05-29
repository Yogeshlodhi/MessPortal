import mongoose, { Schema } from 'mongoose';

const feedBackSuggestion = new Schema(
  {
    feedback: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedbackDescription: {
      type: String,
      required: true,
      trim: true,
    },
    suggestion: {
      type: String,
      trim: true,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    student: {
      type: String,
    },
    studentRoll: {
      type: String,
      uppercase: true,
      trim: true,
    },
    mealOfDay: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Lunch', 'Dinner'],
    },
    feedbackImage: {
      public_id: { type: String },
      url: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

// Admin list: newest first + "today's feedback" range scans on submissionDate.
feedBackSuggestion.index({ submissionDate: -1 });
feedBackSuggestion.index({ mealOfDay: 1, submissionDate: -1 });

const feedbackModel = mongoose.model('FeedbackSubmission', feedBackSuggestion, 'Feedbacks');

export default feedbackModel;
