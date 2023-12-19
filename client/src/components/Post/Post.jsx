import axios from "axios";
import React, { useEffect, useState } from 'react';
import formatDistance from "date-fns/formatDistance";
import {Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Favoriteborder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Post = ({post,setData}) => {
  const {currentUser} = useSelector((state)=>state.user);

  const [userData, setUserData]= useState();

  const dateStr = formatDistance(new Date(post.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  console.log(location);

    useEffect(()=>{
    const fetchData = async () =>{
      try{
        const findUser = await axios.get(`/users/find/${post.userId}`);
        setUserData(findUser.data);
      } catch (err){
        console.log("error",err);
      }

    };
    fetchData();
  }, [post.userId, post.likes]);

  const handleLike = async (e)=> {
    e.preventDefault();

    try {
      const like = await axios.put(`/posts/${post._id}/like`, {
        id: currentUser._id,
      });

      if(location.includes("profile")){
        const newData = await axios.get(`posts/user/all${id}`);
        setData(newData.data);
      } else if (location.includes("explore")){
        const newData = await axios.get(`posts/explore`);
        setData(newData.data);
      } else{
        const newData = await axios.get(`/posts/timeline/${currentUser._id}`);
        setData(newData.data);
      }

    } catch (err) {
      console.log("Error",err)
    }
  }
  return (
  <div>
    {userData && (
      <>
      <div className="flex space-x-2">
        {/*<img src="" alt="" />*/}
        <Link to={`/profile/${userData._id}`}>
          <h3 className="font-bold">{userData.username}</h3>
        </Link>
       {/* <span className="font-normal">@{userData.username}</span>*/}
       <p> - {dateStr} </p>
      </div>

      <p>{post.description}</p>
      <button onClick={handleLike}>
        {post.likes.includes(currentUser._id) ?(
        <FavoriteIcon className="mr-2 my-2 curosr-pointer"></FavoriteIcon>
      ) : (<Favoriteborder className="mr-2 my-2 curosr-pointer"></Favoriteborder>) }  
      {post.likes.length}
      </button>
      </>
    )}
  </div>
  );
};

export default Post