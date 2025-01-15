import express from "express"
import verifyToken from "../middleware/verifyToken.js";
import {verifydb} from "../middleware/verifydb.js"
import {
  getMessages,
  sendMessage
} from "../controllers/message.js"
const router = express.Router()

router.use(verifydb)
router.route("/:id").get(verifyToken,getMessages)
router.route("/send/:id").post(verifyToken,sendMessage)

export default router