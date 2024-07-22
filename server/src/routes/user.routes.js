import {Router} from "express"
import { loginUser, registerUser,logoutUser,refreshAccessToken, removeContest, addSolution, removeSolution ,getSolutions} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/removeContest").post(verifyJWT,removeContest);
router.route("/addSolution").post(verifyJWT,addSolution);
router.route("/removeSolution").post(verifyJWT,removeSolution);
router.route("/getSolutions").post(verifyJWT,getSolutions);

export default router;