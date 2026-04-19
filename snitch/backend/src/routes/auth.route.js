import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { registerValidate, loginValidate } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", registerValidate, register);
router.post("/login", loginValidate, login); 

export default router;

