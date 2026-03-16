import { Router } from "express";
import { getMe, login, register, verifyEmail } from "../controller/auth.controller.js";
import { registerValidation } from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', registerValidation, register)

authRouter.get('/verify-email',verifyEmail)

authRouter.post('/login',login)

authRouter.get('/get-me',authUser,getMe)

export default authRouter