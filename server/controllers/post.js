import Post from '../models/Post.js';
import { handleError } from '../error.js';


export const createPost = async (req, res, next) => {
    const newPost = new Post(req.body);
    try{
        const savedPost  = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        handleError(500, err)

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
  