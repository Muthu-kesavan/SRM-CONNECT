import axios from "axios";
import React, { useEffect, useState } from 'react';
import Linkify from 'react-linkify';
import formatDistance from "date-fns/formatDistance";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import  Tooltip  from "@mui/material/Tooltip";
import Favoriteborder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comment from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ViewIcon from '@mui/icons-material/Visibility';
import SubmitIcon from "@mui/icons-material/SendOutlined";
import ProfileModal from "../ProfileModal/ProfileModal";

const Post = ({ post, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [enlargePicture, setEnlargePicture] = useState(false);
  const dateStr = formatDistance(new Date(post.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${post.userId}`);
        setUserData(findUser.data || {}); 
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
        setCommentCount(response.data?.comments?.length || 0); 
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
        id: currentUser?._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`posts/user/all${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`posts/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/posts/timeline/${currentUser?._id}`);
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
        userId: currentUser?._id,
      });

      const fetchedComments = await axios.get(`/posts/comments/${post._id}`);
      setComments(fetchedComments.data?.comments || []);
      setReplyText('');
    } catch (err) {
      console.log("Error adding comment:", err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await axios.get(`/posts/comments/${post._id}`);
        setComments(fetchedComments.data?.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    if (showComments) {
      fetchComments();
    }
  }, [post._id, showComments]);

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handlePictureClick = () => {
    setEnlargePicture(!enlargePicture);
  };
  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2 items-center">
            <div className="mb-0 cursor-pointer" onClick={handleProfileClick}>
              {userData.profilePicture ? (
                <div className="mb-4">
                  <img 
                    src={userData.profilePicture}
                    alt="Profile Pic"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/srm-connect-007.appspot.com/o/DefaultProfilePic.jpg?alt=media&token=27177761-1d4e-4490-9809-bcb5556c80d4"
                    alt="Default Profile Pic"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              )}
            </div>
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <p> - {dateStr} ago </p>
          </div>
          <Linkify>
          <p>{post.description}</p>
          </Linkify>
          <div className="flex flex-col items-center">
            {post.video && (
              <video
                controls
                src={post.video}
                alt="Post Video"
                className="rounded-lg max-w-full my-4"
              />
            )}
            {post.picture && (
              <img
                src={post.picture}
                alt="Post Image"
                className={`rounded-lg max-w-full my-4 cursor-pointer ${
                  enlargePicture ? 'max-h-screen' : 'h-64'
                }`}
                onClick={handlePictureClick}
              />
            )}
          </div>
          <Tooltip title="Likes" arrow>
            <button onClick={handleLike}>
              {post.likes?.includes(currentUser?._id) ? (
                <FavoriteIcon className="mr-2 my-2 cursor-pointer hover:scale-125" />
              ) : (
                <Favoriteborder className="mr-2 my-2 cursor-pointer hover:scale-125" />
              )}
              {post.likes?.length || 0}
            </button>
          </Tooltip>
          <Tooltip title="Views" arrow>
            <button>
              <ViewIcon className="ml-5 mr-2 my-5 hover:scale-125" />
              {post.__v || 1}
            </button>
          </Tooltip>
          <Tooltip title="Comment" arrow>
            <button onClick={handleToggleComments}>
              <Comment className="ml-5 mr-2 my-5 cursor-pointer hover:scale-125" />
              {commentCount}
            </button>
          </Tooltip>
          {showComments && (
            <div>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id}>
                    <p className="font-bold">{comment.userId?.username}</p>
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
                  className="bg-slate-200 rounded-lg w-full p-2"
                  placeholder="Comment!"
                ></textarea>
                <button onClick={handleAddComment} className="bgpy-2 px-4 rounded-full ml-auto">
                  <SubmitIcon color="primary" />
                </button>
              </div>
            </div>
          )}
          {showProfileModal && (
            <ProfileModal userData={userData} onClose={handleCloseProfileModal} />
          )}
          <hr className="my-4 border-t-slate-200 px-6" />
        </>
      )}
    </div>
  );
  

};

export default Post;
