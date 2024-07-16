
import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
    role: {
        type: String,
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
}, { _id : false });

const messInfoSchema = new Schema({
    mealPrice: {
        type: Number,
        required: true,
    },
    contacts: [contactSchema],
    messOwner: {
        type: String,
        required: true,
    },
    contractInfo: {
        type: String,
        required: true,
    },
    tenureStarts: {
        type: String,
        required: true,
    },
    tenureEnds: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const messInfoModel = mongoose.model('MessInfo', messInfoSchema, 'MessInformation');

export default messInfoModel;


// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const messInfoSchema = new Schema({
//     mealPrice: {
//         type: Number,
//         required: true,
//     },
//     contacts : {
//         role: {
//             type: String,
//             required: true,
//         },
//         contactNo: {
//             type: String,
//             required: true,
//         },
//         emailId: {
//             type: String,
//             required: true,
//         },
//     },
//     messOwner: {
//         type: String,
//         required: true,
//     },
//     contractInfo: {
//         type: String,
//         required: true,
//     },
//     tenureStarts: {
//         type: String,
//         required: true,
//     },
//     tenureEnds: {
//         type: String,
//         required: true,
//     },
// }, {
//     timestamps: true
// });

// const messInfoModel = mongoose.model('MessInfo', messInfoSchema, 'MessInformation');

// export default messInfoModel;
