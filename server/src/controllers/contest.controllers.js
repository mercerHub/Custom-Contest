import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contest } from "../models/contest.model.js";
import { Problems } from "../models/problem.model.js";
import axios from "axios";
import cheerio  from "cheerio";


const contestData = async (contestId) => {
    const getContest = await axios.get(`https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1`)
    .then((response) => response.data)
    // console.log(getContest);
    if(getContest.status !== "OK"){
        throw new ApiError(500,"Couldn't fetch contest data");
    }

    const contestName = getContest.result.contest.name;
    const problemList = await Promise.all(getContest.result.problems.map(async (problem) => {

        const {contestId,index,name} = problem;
        let searchInDb = await Problems.findOne({$and : [{contestId},{index}]});

        if(!searchInDb){
            const problemURL = `https://codeforces.com/contest/${contestId}/problem/${index}`
            const response = await axios.get(problemURL);
            const $ = cheerio.load(response.data);
            const problemStatement = $('.problem-statement').html();
            
            searchInDb = await Problems.create({
                name,
                index,
                contestId,
                url:problemURL,
                problemStatement
            });
        }
        
        return searchInDb._id;
    }));

    return {
        contestName,
        problemList,
    };

};


const createContest = asyncHandler(async (req, res) => {
    const {url, contestId} = req.body;
    if(!contestId && !url){
        throw new ApiError(400,"contestId or url is required");
    }
    if(!contestId){
        contestId = url.split("/")[url.split("/").length - 1];
    }
    let searchContestInDb = await Contest.findOne({contestId});

    if(!searchContestInDb){
        const {contestName,problemList} = await contestData(contestId);
        const contest = await Contest.create({contestId,name:contestName,problems:problemList});

        if(!contest){
            throw new ApiError(500,"Contest not created");
        }

        searchContestInDb = contest;
        
    }

    if(!req.user.contests.includes(searchContestInDb._id)) {
        req.user.contests.push(searchContestInDb._id);
        await req.user.save({validateBeforeSave:false});
    }

    searchContestInDb.problems.forEach((problem) => {
        if(!req.user.problems.includes(problem)){
            req.user.problems.push(problem);
        }
    });

    await req.user.save({validateBeforeSave:false});

    console.log(searchContestInDb);
    res
    .status(201)
    .json(new ApiResponse(201,searchContestInDb,"Contest created successfully"));
    
});

const getContest = asyncHandler(async(req,res) => {
    const {contest_id} = req.body;

    if(!contest_id){
        throw new ApiError(404,"Contest id required");
    }

    const fetchedContests = await Contest.findById(contest_id);

    if(!fetchedContests){
        new ApiError(404,"No contests found with such id");
    }

    console.log(fetchedContests);

    res
    .status(200)
    .json(new ApiResponse(200,fetchedContests,"Contest Fetched Successfully"))

})

export {
    createContest,
    getContest
} 