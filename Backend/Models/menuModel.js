// import mongoose, { Schema } from "mongoose";

// const menuSchema = new Schema({
//     remarks: {
//         type: String,
//     },
//     timing: {
//         breakfast: {
//             type: String,
//             required: true,
//         },
//         lunch: {
//             type: String,
//             required: true,
//         },
//         dinner: {
//             type: String,
//             required: true,
//         },
//         specialTiming: {
//             type: String,
//         }
//     },
//     monday: {
//         breakfast: {
//             type: String,
//             required: true,
//         },
//         lunch: {
//             type: String,
//             required: true,
//         },
//         dinner: {
//             type: String,
//             required: true,
//         },
//         specialTiming: {
//             type: String,
//         }
        
//     },
//     tuesday: {
//         breakfast: {
//             type: String,
//             required: true,
//         },
//         lunch: {
//             type: String,
//             required: true,
//         },
//         dinner: {
//             type: String,
//             required: true,
//         },
//         specialTiming: {
//             type: String,
//         }
        
//     },
//     wednesday: {
//         breakfast: {
//             type: String,
//             required: true,
//         },
//         lunch: {
//             type: String,
//             required: true,
//         },
//         dinner: {
//             type: String,
//             required: true,
//         },
//         specialTiming: {
//             type: String,
//         }
        
//     },
//     thursday: {
//         breakfast: {
//             type: String,
//             required: true,
//         },
//         lunch: {
//             type: String,
//             required: true,
//         },
//         dinner: {
//             type: String,
//             required: true,
//         },
//         specialTiming: {
//             type: String,
//         }
        
//     },
//     friday: {
//         breakfast: {
//             type: String,
//             required: true,
//         },
//         lunch: {
//             type: String,
//             required: true,
//         },
//         dinner: {
//             type: String,
//             required: true,
//         },
//         specialTiming: {
//             type: String,
//         }
        
//     },
//     saturday: {
//         breakfast: {
//             type: String,
//             required: true,
//         },
//         lunch: {
//             type: String,
//             required: true,
//         },
//         dinner: {
//             type: String,
//             required: true,
//         },
//         specialTiming: {
//             type: String,
//         }
        
//     },
//     sunday: {
//         breakfast: {
//             type: String,
//             required: true,
//         },
//         lunch: {
//             type: String,
//             required: true,
//         },
//         dinner: {
//             type: String,
//             required: true,
//         },
//         specialTiming: {
//             type: String,
//         }

//     },
//     amountOfOneMeal: {
//         type: Number
//     },
//     monthOfMenu: {
//         type: String,
//         enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//         required: true
//     }
// },
// {
//     timestamps: true
// }
// )

// const menuModel = mongoose.model("MenuData", menuSchema, "Menu");

// export default menuModel;

import mongoose, { Schema } from "mongoose";

const dailyMenuSchema = new Schema({
    breakfast: {
        type: String,
        required: true,
    },
    lunch: {
        type: String,
        required: true,
    },
    dinner: {
        type: String,
        required: true,
    },
    extras: {
        type: String,
    }
}, { _id: false });

const menuSchema = new Schema({
    remarks: {
        type: String,
    },
    timing: {
        breakfast: {
            type: String,
            required: true,
        },
        lunch: {
            type: String,
            required: true,
        },
        dinner: {
            type: String,
            required: true,
        },
        specialTiming: {
            type: String,
        }
    },
    weeklyMenu: {
        monday: dailyMenuSchema,
        tuesday: dailyMenuSchema,
        wednesday: dailyMenuSchema,
        thursday: dailyMenuSchema,
        friday: dailyMenuSchema,
        saturday: dailyMenuSchema,
        sunday: dailyMenuSchema
    },
    // monthOfMenu: {
    //     type: String,
    //     enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //     required: true
    // }
}, {
    timestamps: true
});

const menuModel = mongoose.model("MenuData", menuSchema, "Menu");

export default menuModel;
