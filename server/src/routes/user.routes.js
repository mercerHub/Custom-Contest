import {Router} from "express"
import { loginUser, registerUser,logoutUser,refreshAccessToken, removeContest } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/removeContest").post(verifyJWT,removeContest);

export default router;