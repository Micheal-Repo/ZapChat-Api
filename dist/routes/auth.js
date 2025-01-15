import express from "express";
import { verifydb } from "../middleware/verifydb.js";
//controllers 
import { signup, signin, logout } from "../controllers/auth.js";
const router = express.Router();
router.use(verifydb);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").get(logout);
export default router;
