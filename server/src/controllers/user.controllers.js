import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { Contest } from "../models/contest.model.js";
import {Solutions } from "../models/solution.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, name, email, password } = req.body;

    if ([username, name, email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existsUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existsUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        name,
        email: email.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) throw new ApiError(500, "User not created");

    res.status(201).json(new ApiResponse(201, createdUser,"User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if ((!username?.trim() && !email?.trim()) || !password?.trim()) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({
        $or: [{ email: email?.toLowerCase() }, { username: username?.toLowerCase() }],
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200,{ loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    if(!req.user) throw new ApiError(401,"No user found to logout")
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    await user.save();


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,"User logged Out "))
});
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken) {
        throw new ApiError(402 ,"unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id);
        if(!user) {
            throw new ApiError(401 ,"invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly:true,
            secure: true
        }
    
        const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken: newRefreshToken}
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid refresh token")
    }
})

const removeContest = asyncHandler(async (req,res) => {
    if(!req.user){
        throw new ApiError(401,"No user found : remove contest");
    }

    const {contestId} = req.body;

    const user = await User.findById(req.user._id);
    const contestInDb = await Contest.find({contestId: contestId});

    if(!user || !contestInDb) new ApiError(404,"No such user or contest found !!");

    const contestListOfUser = user.contests;

    const updatedContestListOfUser = contestListOfUser.filter((contestIdsOfUser) => {
        console.log(`${contestIdsOfUser.toString()} ${(contestInDb[0]._id).toString()}`)
        return contestIdsOfUser.toString() !== (contestInDb[0]._id).toString()
    })
    

    console.log(updatedContestListOfUser);
    
    const userToUpdate = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                contests:updatedContestListOfUser
            }
        },
        {
            new: true
        }
    )
    const finalSave = await userToUpdate.save();

    if(!finalSave){
        throw new ApiError(409,"Couldn't save updated contest list in DB")
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,contestInDb[0],"Contest list updated succesfully !!")
    )
    
})

const addSolution = asyncHandler(async(req,res) => {
    const {problemId,userId,solutionData} = req.body;
    const {code,explanation,plan,analysis} = solutionData;

    if(!problemId || !userId) throw new ApiError(405,"Problem id or user id missing !!");

    const createSolution = await Solutions.create(
        {
            userId,
            problemId,
            solutionData:{
                code,
                explanation,
                plan,
                analysis
            }
        }
    )

    if(!createSolution) throw new ApiError(401,"Couldn't create solution");

    return res
    .status(200)
    .json(new ApiResponse(200,{createSolution},"Solution Created Successfully !!"));
})

const removeSolution = asyncHandler(async(req,res) => {
    const {solutionId} = req.body;

    if(!solutionId) throw new ApiError(404,"Solution id missing in request");

    const deleted = await Solutions.findByIdAndDelete(solutionId);

    if(!deleted) throw new ApiError(404,"Couldn't delete solution");

    return res
    .status(200)
    .json(new ApiResponse(200,deleted,"Solution deleted successfully !!"))
})

const getSolutions = asyncHandler(async(req,res) => {
    const {problemId,userId} = req.body;

    if(!problemId || !userId) throw new ApiError(404,"Problem id or user id missing in request");

    const solution = await Solutions.find({problemId,userId});
    if(!solution) throw new ApiError(404,"No solution found");

    return res
    .status(200)
    .json(new ApiResponse(200,solution,"Solution fetched successfully !!"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    removeContest,
    addSolution,
    removeSolution,
    getSolutions
};
