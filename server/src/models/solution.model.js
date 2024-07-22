import { Schema } from "mongoose"
import mongoose from "mongoose"


const solutionSchema = new Schema(
    {
        problemId: {
            type: Schema.Types.ObjectId,
            ref:"problem",
            required: true
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required:true,
            index:true
        },
        solutionData:{
            code:{
                type: String,
            },
            plan:{
                type:String
            },
            explanation:{
                type:String
            },
            analysis:{
                type:String
            }
        }
    }
)

export const Solutions = mongoose.model("solution",solutionSchema)