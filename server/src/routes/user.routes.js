import {Router} from "express"
import { loginUser, registerUser,logoutUser,refreshAccessToken } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
<<<<<<< HEAD
router.route("/refresh-token").post(refreshAccessToken)
=======
router.route("/refresh-token").post(verifyJWT,refreshAccessToken)
>>>>>>> 8e07386 (Initial commit)

export default router;