import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createPost, deletePost, likeOrDislike } from "../controllers/post.js";

const router = express.Router();

router.post('/', verifyToken, createPost)

router.delete('/:id', verifyToken, deletePost);

router.put('/:id/like', likeOrDislike);

export default router;