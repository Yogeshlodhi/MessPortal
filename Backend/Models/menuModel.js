import mongoose, { Schema } from "mongoose";

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
    monday: {
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
    tuesday: {
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
    wednesday: {
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
    thursday: {
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
    friday: {
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
    saturday: {
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
    sunday: {
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
},
{
    timestamps: true
}
)

const menuModel = mongoose.model("MenuData", menuSchema, "Menu");

export default menuModel;