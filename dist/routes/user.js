import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { verifydb } from "../middleware/verifydb.js";
import { getAllUsers } from "../controllers/user.js";
const router = express.Router();
router.use(verifydb);
router.route("/").get(verifyToken, getAllUsers);
export default router;
