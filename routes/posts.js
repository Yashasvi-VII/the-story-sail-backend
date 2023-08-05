import express from "express";
import { addPost } from "../controllers/Controller.js";

const router = express.Router();

// route for creating a new blog post
router.post("/posts", addPost);

export default router;
