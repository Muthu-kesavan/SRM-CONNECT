import Post from '../models/Post.js';
import { handleError } from '../error.js';
import User from '../models/User.js';

export const createPost = async (req, res, next) => {
    const newPost = new Post(req.body);
    try{
        const savedPost  = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        handleError(500, err);
      }

};

export const deletePost = async (req, res, next) => {
    
    try{
        const post = await Post.findById(req.params.id);
         if(post.userId === req.body.id){
            await post.deleteOne();
            res.status(200).json('Post deleted');
         } else{
            handleError(500, err);
         }
    }catch(err){
        handleError(500, err);
    }

};

export const likeOrDislike = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.id)) {
        await post.updateOne({ $push: { likes: req.body.id } });
        res.status(200).json("post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.id } });
        res.status(200).json("post has been disliked");
      }
    } catch (err) {
      handleError(500, err);
    }
  };

  export const getAllPosts = async (req, res, next) => {
    try {
      const currentUser = await User.findById(req.params.id);
      const userPosts = await Post.find({ userId: currentUser._id });
      const followersPosts = await Promise.all(
        currentUser.following.map((followerId) => {
          return Post.find({ userId: followerId });
        })
      );
  
      res.status(200).json(userPosts.concat(...followersPosts));
    } catch (err) {
      handleError(500, err);
    }
  };

export const getUserPosts = async(req, res, next)=>{
  try{
    const userPosts = await Post.find({ userId: req.params.id}).sort({
      createAt: -1,
    });
     res.status(200).json(userPosts);
  } catch (err){
    handleError(500, err);
  }
};

export const getFeed = async (req, res, next) => {
  try {
    const feeds = await Post.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(feeds);
  } catch (err) {
    handleError(500, err);
  }
};


export const incrementUniquePostViews = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json('Post not found');
    }

    if (!post.views.includes(userId)) {
      post.views.push(userId); 
      post.views += 1; 
      await post.save();
      res.status(200).json('view count incremented');
    } else {
      res.status(200).json('Already viewed by this user');
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const replyToPost = async (req,res)=> {
  try{
    const {text} = req.body;
    const postId = req.params.id;
    const userId = req.body.userId;
  

    if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const reply = { userId, text};

		post.replies.push(reply);
		await post.save();

		res.status(200).json(reply);
	} catch (err) {
		res.status(500).json({ error: err.message });
  }
}
