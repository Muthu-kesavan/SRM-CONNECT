import axios from "axios";
import React, { useEffect, useState } from 'react';
import formatDistance from "date-fns/formatDistance";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Favoriteborder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comment from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ViewIcon from '@mui/icons-material/Visibility';
import SubmitIcon from "@mui/icons-material/SendOutlined";

const Post = ({ post, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState();
  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const dateStr = formatDistance(new Date(post.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${post.userId}`);
        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [post.userId, post.likes]);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`/posts/comments/${post._id}`);
        setCommentCount(response.data.comments.length);
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };
    fetchCommentCount();
  }, [post._id]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const like = await axios.put(`/posts/${post._id}/like`, {
        id: currentUser._id,
      });


      if (location.includes("profile")) {
        const newData = await axios.get(`posts/user/all${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`posts/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/posts/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("Error", err)
    }
  }

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.put(`/posts/reply/${post._id}`, {
        text: replyText,
        userId: currentUser._id,
      });

      const fetchedComments = await axios.get(`/posts/comments/${post._id}`);
      if (Array.isArray(fetchedComments.data.comments)) {
        setComments(fetchedComments.data.comments);
      }

      setReplyText('');
    } catch (err) {
      console.log("Error adding comment:", err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await axios.get(`/posts/comments/${post._id}`);
        if (Array.isArray(fetchedComments.data.comments)) {
          setComments(fetchedComments.data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    if (showComments) {
      fetchComments();
    }
  }, [post._id, showComments]);

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <p> - {dateStr} ago </p>
          </div>
          <p>{post.description}</p>
          
          <button onClick={handleLike}>
            {post.likes.includes(currentUser._id) ? (
              <FavoriteIcon className=" mr-2 my-2 curosr-pointer hover:scale-125 "></FavoriteIcon>
            ) : (
              <Favoriteborder className="mr-2 my-2 curosr-pointer hover:scale-125"></Favoriteborder>
            )}
            {post.likes.length}
          </button>

          <button onClick={handleToggleComments}>
            <Comment className="ml-5 mr-2 my-5 cursor-pointer hover:scale-125" />
            {commentCount}
          </button>

          {showComments && (
            <div>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id}>
                    <p className="uppercase ">{comment.userId.username}</p>
                    <p className="font italic">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
              <div className="flex items-center mt-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="bg-slate-200 rounded-md flex items-center p-4 focus:outline-none blue-500"
                  placeholder="Comment!"
                ></textarea>
                <button onClick={handleAddComment} className="bgpy-2 px-4 rounded-full ml-auto">
                  <SubmitIcon color="primary" />
                </button>
              </div>
            </div>
          )}

          <button>
            <ViewIcon className="ml-5 mr-2 my-5 hover:scale-125" />
            {post.__v}
          </button>
        </>
      )}
    </div>
  );
};

export default Post;
