import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Problems } from "../models/problem.model.js"

const saveFetchedProblems = asyncHandler(async(req,res)=>{
    const {url,problemStatement} = req.body;
    const searchProblem = await Problems.findOne({url});
    if(searchProblem){
        throw new ApiError(400,"Problem already exists");
    }

    const createProblem = await Problems.create({
        url,
        problemStatement
    })

    if(!createProblem) throw new ApiError(400,"Failed to save problem in db")

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            problem: url,
        },"Problem saved successfully !!!")
    )
})

export {saveFetchedProblems}