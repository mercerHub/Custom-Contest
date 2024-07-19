import { Router } from "express";
import fetchProblemsController from "../controllers/fetchProblems.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/fetchProblems").post(verifyJWT,fetchProblemsController);


export default router;