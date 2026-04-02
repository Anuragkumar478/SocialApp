import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createPost,
  getPosts,
  toggleLike,
  addComment
} from "../controllers/postController.js";

const router = express.Router();

router.post("/",protect, upload.single("image"), createPost);
router.get("/", getPosts);
router.put("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);

export default router;