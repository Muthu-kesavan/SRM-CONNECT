import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createPost, deletePost, likeOrDislike, getAllPosts, getUserPosts, getFeed, replyToPost, Views, getCommentsByPost } from "../controllers/post.js";

const router = express.Router();

router.post('/', verifyToken, createPost)

router.delete('/:id', verifyToken, deletePost);

router.put('/:id/like', likeOrDislike);

router.put('/:id/view', Views);

router.put('/reply/:id', replyToPost);

router.get('/timeline/:id', getAllPosts);

router.get('/user/all/:id', getUserPosts);

router.get('/explore', getFeed);

router.get('/comments/:id', getCommentsByPost);

export default router;