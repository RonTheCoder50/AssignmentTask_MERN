import express from "express";
const router = express.Router();

import {
  userLogin,
  userRegister,
  getCurrent,
} from "../controller/userController.js";

import validateToken from "../middleware/validateTokenHandler.js";

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/current", validateToken, getCurrent);

export default router;
