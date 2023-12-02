import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createPost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.post('/', verifyToken, createPost)

router.delete('/:id', verifyToken, deletePost);

export default router;