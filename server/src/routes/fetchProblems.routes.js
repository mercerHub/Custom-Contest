import { Router } from "express";
import fetchProblemsController from "../controllers/fetchProblems.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { removeProblem } from "../controllers/saveFetchedProblems.controller.js";

const router = Router();

router.route("/fetchProblems").post(verifyJWT,fetchProblemsController);
router.route("/removeProblem").post(verifyJWT,removeProblem);



export default router;