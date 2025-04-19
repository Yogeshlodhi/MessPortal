import mongoose, {Schema} from "mongoose";


const announcementSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
}
)

const announcementModel = mongoose.model("Announcement", announcementSchema, "Announcements");

export default announcementModel;