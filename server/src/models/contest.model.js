import mongoose, { Schema } from "mongoose";

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    contestId: {
        type: String,
        required: true,
        unique: true,
    },
    problems: [
        {
            type: Schema.Types.ObjectId,
            ref: "problem",
        },
    ],
});



export const Contest = mongoose.model('Contest', contestSchema);
