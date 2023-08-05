import express from "express";
import { putPost } from "../controllers/Controller.js";

const router = express.Router();

// route for updating existing blog post
router.put("/:id", putPost);

export default router;
