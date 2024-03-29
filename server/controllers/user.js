import { handleError } from "../error.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const getUser = async(req, res, next)=>{
  try{
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
  }catch(err){
      next(err);
  }
};

export const update = async(req, res, next) => {
  if (req.params.id === req.user.id) {
    try{
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
        $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedUser);
  } catch(err) {}
} else{
  return next(handleError(403, "You can only update your own account"));
}
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Post.deleteMany({userId: req.params.id});
      res.status(200).json("User delete");
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(403, "You can only update your own account"));
  }
};


export const follow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)){
      await  user.updateOne({
        $push:{followers : req.body.id},
      });

      await currentUser.updateOne({$push: {following: req.params.id }});
    } else {
      res.status(403).json("User is already Followed by You");
    }
    res.status(200).json("Your Following");  
  } catch(err) {
    next(err);
  }
};

export const unFollow = async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });
      await currentUser.updateOne({ $pull: { following: req.params.id} });
    } else {
      res.status(403).json("You Are Not Following this User");
    }
    res.status(200).json("Unfollowed the user");
  } catch(err) {
    next(err);
  }
};

export const userFollowers = async (req, res)=>{
  try{
    const userfollowers = await User.findById(req.params.id).populate('followers', 'username');
    res.status(200).json(userfollowers.followers);
  } catch(err){
    res.status(500).json("Error");
  }
};


export const userFollowing = async (req, res) => {
  try {
    const userfollowing = await User.findById(req.params.id).populate('following', 'username');
    res.status(200).json(userfollowing.following);
  } catch (err) {
    console.error(err);
    res.status(500).json("error");
  }
};


export const searchUsers = async (req, res, next) => {
  try {
    const query = req.params.query;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("username profilePicture");

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
