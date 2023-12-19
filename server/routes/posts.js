import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createPost, deletePost, likeOrDislike, getAllPosts, getUserPosts, getFeed, replyToPost } from "../controllers/post.js";

const router = express.Router();

router.post('/', verifyToken, createPost)

router.delete('/:id', verifyToken, deletePost);

router.put('/:id/like', likeOrDislike);

//router.put('/:id/view', incrementUniquePostViews);

router.put('/reply/:id', replyToPost);

router.get('/timeline/:id', getAllPosts);

router.get('/user/all/:id', getUserPosts);

router.get('/explore', getFeed);

export default router;