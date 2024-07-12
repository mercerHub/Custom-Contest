import { Router } from "express";
import { createContest } from "../controllers/contest.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/createContest").get(verifyJWT,createContest);

export default router;