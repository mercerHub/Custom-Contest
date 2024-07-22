import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Problems } from "../models/problem.model.js"
import { User } from "../models/user.model.js"
import { Solutions } from "../models/solution.model.js"

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

const removeProblem = asyncHandler(async(req,res)=>{
    const {problemId} = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(404,"User not found");
    }


    const problemList = user.problems.filter((problem) => problem.toString() !== problemId.toString());

    user.problems = problemList;
    const alteredUser =  await user.save({validateBeforeSave:false});

    const deleteSolutions = await Solutions.deleteMany({$and:[{userId},{problemId}]});

    if(!deleteSolutions){
        throw new ApiError(500,"Failed to delete solutions of problem");
    }

    if(!alteredUser){
        throw new ApiError(500,"Failed to remove problem from user");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            problemList
        },"Problem removed successfully")
    )

})

export {
    saveFetchedProblems,
    removeProblem
}