import express from "express";
import { getPost } from "../controllers/Controller.js";

const router = express.Router();

// route for fetching all blog posts
router.get("/posts", getPost);

export default router;
