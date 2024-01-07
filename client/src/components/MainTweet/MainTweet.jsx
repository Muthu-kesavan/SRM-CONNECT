import React, { useState } from "react";
import TimelineTweet from "../TimelinePost/TimelinePost";
import Tooltip from "@mui/material/Tooltip";
import Send from '@mui/icons-material/SendOutlined';
import { useSelector } from "react-redux";
import axios from "axios";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const playNotificationSound = () => {
    const audio = new Audio('https://firebasestorage.googleapis.com/v0/b/srm-connect-007.appspot.com/o/sound.mp3?alt=media&token=00e21921-eada-4704-ba0d-e68d94c49c03'); 
    audio.play();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tweetText.trim() === ""){
      alert("Please enter the tweet");
      return;
    }
    try {
      const submitTweet = await axios.post("/posts", {
        userId: currentUser._id,
        description: tweetText,
      });
      playNotificationSound();

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
        <Tooltip title="Send" arrow>
        <button 
        onClick={handleSubmit}
        className="py-2 px-4 rounded-full ml-auto">
          <Send color="primary"/>
        </button>
        </Tooltip>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;