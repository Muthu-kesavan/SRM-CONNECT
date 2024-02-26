import React, { useEffect, useState } from "react";
import axios from "axios";
import {Bars} from "react-loader-spinner";
import { useSelector } from "react-redux";
import Post from "../Post/Post";
import "../Loading/Loading.css";
const TimelinePost = () => {
  const [timeLine, setTimeLine] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const timelinePosts = await axios.get(`/posts/timeline/${currentUser._id}`);

        setTimeLine(timelinePosts.data);
      } catch (err) {
        console.log("error", err);
      } finally{
        setIsloading(false);
      }
    };

    fetchData();
  }, [currentUser._id]);

  console.log("Timeline", timeLine);
  return (
    <div className="mt-6">
      {isLoading && (
        <div className="loading-spinner-container">
        <Bars height={80} width={80} color="#5FBDFF" ariaLabel="circles-loading" visible={true} />
      </div>

      )}
      {timeLine &&
        timeLine.map((post) => {
          return (
            <div key={post._id} className="p-2">
              <Post post={post} setData={setTimeLine} />
            </div>
          );
        })}
    </div>
  );
};

export default TimelinePost;