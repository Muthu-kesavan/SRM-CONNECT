import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import Post from "../Post/Post";

const TimelinePost = () => {
  const [timeLine, setTimeLine] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelinePosts = await axios.get(`/posts/timeline/${currentUser._id}`);

        setTimeLine(timelinePosts.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser._id]);

  console.log("Timeline", timeLine);
  return (
    <div className="mt-6">
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