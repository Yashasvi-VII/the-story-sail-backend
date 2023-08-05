import express from "express";
import { deletePost } from "../controllers/Controller.js";

const router = express.Router();

// route for deleting existing blog post by its id
router.delete("/:id", deletePost);

export default router;
