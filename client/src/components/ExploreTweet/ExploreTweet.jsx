import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import Post from "../Post/Post";
const ExploreTweet = () => {
  const [explore, setExplore] = useState(null);
  const {currentUser} = useSelector((state)=> state.user);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const exploreTweets = await axios.get("/posts/explore");
        setExplore(exploreTweets.data);

      } catch (err){
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser._id]);
  return (
    <div className="mt-6">
      {explore &&
        explore.map((post) => {
          return (
            <div key={post._id} className="p-2">
              <Post post={post} setData={setExplore} />
            </div>
          );
        })}
    </div>
  );
};
  
    

export default ExploreTweet