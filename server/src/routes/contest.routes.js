import { Router } from "express";
import { createContest , getContest} from "../controllers/contest.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/createContest").post(verifyJWT,createContest);
router.route("/getContest").post(verifyJWT,getContest);

export default router;