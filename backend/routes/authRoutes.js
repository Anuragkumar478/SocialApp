import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser
} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", (req, res) => {
  res.json(req.user);
});

export default router;