import React, { useState } from "react";
import TimelineTweet from "../TimelinePost/TimelinePost";
import Tooltip from "@mui/material/Tooltip";
import Send from '@mui/icons-material/SendOutlined';
import { useSelector } from "react-redux";
import axios from "axios";
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [picture, setPicture] = useState(null); 
  const { currentUser } = useSelector((state) => state.user);

  const playNotificationSound = () => {
    const audio = new Audio('https://firebasestorage.googleapis.com/v0/b/srm-connect-007.appspot.com/o/sound.mp3?alt=media&token=00e21921-eada-4704-ba0d-e68d94c49c03'); 
    audio.play();
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const submitTweet = await axios.post("/posts", {
              userId: currentUser._id,
              description: tweetText,
              picture: downloadURL,
            });

            console.log(submitTweet);
          } catch (err) {
            console.log(err);
          }
        });
      }
    );
  };

  const handleIconClick = () => {
    document.getElementById('pictureInput').click();
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!tweetText.trim() && !picture) {
      alert("Please enter the tweet text or upload a picture");
      return;
    }
  
    try {
      let downloadURL = '';
      if (picture) {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + picture.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, picture);
  
        await uploadTask;
  
        downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      }
  
      const submitTweet = await axios.post("/posts", {
        userId: currentUser._id,
        description: tweetText,
        picture: downloadURL || '', 
      });
  
      console.log(submitTweet);
  
      playNotificationSound();
      setPicture(null);
      setTweetText("");
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
          value={tweetText}
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <input
          type="file"
          id ="pictureInput"
          onChange={handlePictureChange}
          accept= "image/*, video/*"
          className="hidden"

        />
        <Tooltip title="Picture" arrow>
          <button
            type="button"
            onClick={handleIconClick}
            className="my-2 focus:outline-none"
          >
            <AddAPhotoRoundedIcon color="primary" />
          </button>
        </Tooltip>
        <Tooltip title="Send" arrow>
          <button 
            type="button"
            onClick={handleSubmit}
            className={`py-2 px-4 rounded-full ml-auto ${!tweetText.trim() && !picture ? 'cursor-not-allowed opacity-80' : ''}`}
            disabled={!tweetText.trim() && !picture} 
          >
            <Send color="primary"/>
          </button>
        </Tooltip>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;

