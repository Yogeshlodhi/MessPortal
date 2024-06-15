import mongoose from 'mongoose';

const { Schema } = mongoose;

const messInfoSchema = new Schema({
    mealPrice: {
        type: Number,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    messOwner: {
        type: String,
        required: true,
    },
    contractInfo: {
        type: String,
        required: true,
    },
    tenureStarts: {
        type: Date,
        required: true,
    },
    tenureEnds: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

const messInfoModel = mongoose.model('MessInfo', messInfoSchema, 'MessInformation');

export default messInfoModel;
