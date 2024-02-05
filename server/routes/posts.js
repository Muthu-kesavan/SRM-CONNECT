import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createPost, deletePost, likeOrDislike, getAllPosts, getUserPosts, getFeed, replyToPost, Views, getCommentsByPost } from "../controllers/post.js";

const router = express.Router();

router.post('https://dataflow-412p.onrender.com/', verifyToken, createPost)

router.delete('https://dataflow-412p.onrender.com/:id', verifyToken, deletePost);

router.put('https://dataflow-412p.onrender.com/:id/like', likeOrDislike);

router.put('https://dataflow-412p.onrender.com/:id/view', Views);

router.put('https://dataflow-412p.onrender.com/reply/:id', replyToPost);

router.get('https://dataflow-412p.onrender.com/timeline/:id', getAllPosts);

router.get('https://dataflow-412p.onrender.com/user/all/:id', getUserPosts);

router.get('https://dataflow-412p.onrender.com/explore', getFeed);

router.get('https://dataflow-412p.onrender.com/comments/:id', getCommentsByPost);

export default router;