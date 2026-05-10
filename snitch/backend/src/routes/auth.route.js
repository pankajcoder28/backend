import express from "express";
import { login, register,googleCallback } from "../controllers/auth.controller.js";
import { registerValidate, loginValidate } from "../validators/auth.validator.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerValidate, register);
router.post("/login", loginValidate, login);

router.get('/google',passport.authenticate('google',{scope:['profile','email']})); 
router.get('/google/callback',passport.authenticate('google',{session: false}),googleCallback)

export default router;

