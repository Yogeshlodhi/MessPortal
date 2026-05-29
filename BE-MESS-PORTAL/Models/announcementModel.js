import mongoose, { Schema } from 'mongoose';

const announcementSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Announcements are always listed newest-first.
announcementSchema.index({ createdAt: -1 });

const announcementModel = mongoose.model('Announcement', announcementSchema, 'Announcements');

export default announcementModel;
