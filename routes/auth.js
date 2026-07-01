import express from "express"
import { handleSignIn } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/", handleSignIn)

export default authRouter