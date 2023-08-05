import express from "express";
import { getById } from "../controllers/Controller.js";

const router = express.Router();

// route for fetching all blog posts
router.get("/:id", getById);

export default router;
