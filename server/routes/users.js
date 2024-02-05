import express from "express";
import { getUser, update, deleteUser, follow, unFollow, userFollowers, userFollowing, searchUsers} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

router.put("https://dataflow-412p.onrender.com/:id",verifyToken, update);

router.get("https://dataflow-412p.onrender.com/find/:id", getUser);

router.delete("https://dataflow-412p.onrender.com/:id", verifyToken, deleteUser);

router.put("https://dataflow-412p.onrender.com/follow/:id", verifyToken, follow);

router.put("https://dataflow-412p.onrender.com/unfollow/:id", verifyToken, unFollow);

router.get("https://dataflow-412p.onrender.com/:id/followers", userFollowers);

router.get("https://dataflow-412p.onrender.com/:id/following",userFollowing);

router.get("https://dataflow-412p.onrender.com/search/:query", verifyToken, searchUsers);

export default router;