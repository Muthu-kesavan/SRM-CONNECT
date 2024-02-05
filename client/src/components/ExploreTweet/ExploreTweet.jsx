import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import Post from "../Post/Post";
import "../Loading/Loading.css";
const ExploreTweet = () => {
  const [explore, setExplore] = useState(null);
  const [isLoading,setIsloading] = useState(false);
  const {currentUser} = useSelector((state)=> state.user);
  useEffect(()=>{
    const fetchData = async()=>{
      setIsloading(true);

      try{
        const exploreTweets = await axios.get("https://dataflow-412p.onrender.com/posts/explore");
        setExplore(exploreTweets.data);

      } catch (err){
        console.log(err);
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, [currentUser._id]);
  return (
    <div className="mt-6">
      {isLoading && (
        <div className="loading-spinner-container">
        <Circles height={80} width={80} color="#5FBDFF" ariaLabel="circles-loading" visible={true} />
      </div>
      )}
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