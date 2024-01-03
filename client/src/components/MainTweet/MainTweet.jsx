import React, { useState } from "react";
import TimelineTweet from "../TimelinePost/TimelinePost";
import Send from '@mui/icons-material/SendOutlined';
import Camera from '@mui/icons-material/CameraAltOutlined';
import { useSelector } from "react-redux";
import axios from "axios";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitTweet = await axios.post("/posts", {
        userId: currentUser._id,
        description: tweetText,
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button 
        onClick={handleSubmit}
        className="py-2 px-4 rounded-full ml-auto">
          <Send color="primary"/>
        </button>
        <button className="py-2 px-4 rounded-full ml-auto">
         <Camera color="primary"/>
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;