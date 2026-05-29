import mongoose, { Schema } from 'mongoose';

const dailyMenuSchema = new Schema(
  {
    breakfast: { type: String, required: true },
    lunch: { type: String, required: true },
    dinner: { type: String, required: true },
    extras: { type: String },
  },
  { _id: false },
);

const menuSchema = new Schema(
  {
    remarks: {
      type: String,
    },
    timing: {
      breakfast: { type: String, required: true },
      lunch: { type: String, required: true },
      dinner: { type: String, required: true },
      specialTiming: { type: String },
    },
    weeklyMenu: {
      monday: dailyMenuSchema,
      tuesday: dailyMenuSchema,
      wednesday: dailyMenuSchema,
      thursday: dailyMenuSchema,
      friday: dailyMenuSchema,
      saturday: dailyMenuSchema,
      sunday: dailyMenuSchema,
    },
  },
  {
    timestamps: true,
  },
);

// The active menu is the most recently updated one.
menuSchema.index({ createdAt: -1 });

const menuModel = mongoose.model('MenuData', menuSchema, 'Menu');

export default menuModel;
