import cheerio from "cheerio";
import axios from "axios";
import { Problems } from "../models/problem.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const fetchProblemsController = async (req, res) => {
    const url = req.query.url;
    const contestId = url.split("/")[url.split("/").length - 3];
    const problemIndex = url.split("/")[url.split("/").length - 1];
    try {
        const problem = await Problems.findOne({ url });
        if (!problem) {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const problemStatement = $('.problem-statement').html();
            const title = $('.title').text();
            
            const createProblem = await Problems.create({
                name: title,
                index: problemIndex,
                contestId,
                url,
                problemStatement
            });

            // Send the response with problemStatement and createProblem object
            return res.status(200).json(
                new ApiResponse(200,  createProblem, "Problem sent to client!!")
            );
        } else {
            console.log("Problem present in database");
            const { url, problemStatement } = problem;

            // Send the response with the problem data from the database
            return res.status(200).json(
                new ApiResponse(200, problemStatement, "Logged problem data")
            );
        }
    } catch (error) {
        return res.status(error.response ? error.response.status : 500).send(error.message);
    }
};

export default fetchProblemsController;
