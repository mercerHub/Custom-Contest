import mongoose, { Schema } from "mongoose";


const problemSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        index: {
            type: String,
            required: true,
        },
        url: {
            type:String,
            unique: true,
            index: true,
            required: true,
            trim:true
        },
        problemStatement: {
            type: String,
            required: true
        },
        contestId: {
            type: String,
            required: true,
            index: true 
        }
    }
)

export const Problems = mongoose.model("problem",problemSchema);