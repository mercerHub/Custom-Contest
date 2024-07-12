import { Router } from "express";
import { saveFetchedProblems } from "../controllers/saveFetchedProblems.controller.js";

const router = Router();

router.route('/saveFetchedProblems').post(saveFetchedProblems)

export default router;