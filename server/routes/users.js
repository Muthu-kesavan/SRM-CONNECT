import express from "express";
import { getUser, update, deleteUser, follow, unFollow, userFollowers, userFollowing} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

router.put("/:id",verifyToken, update);

router.get("/find/:id", getUser);

router.delete("/:id", verifyToken, deleteUser);

router.put("/follow/:id", verifyToken, follow);

router.put("/unfollow/:id", verifyToken, unFollow);

router.get("/:id/followers", userFollowers);

router.get("/:id/following",userFollowing);



export default router;