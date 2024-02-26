import React,{useEffect} from 'react'
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";

const Placeholder = ({setUserData, userData}) => {
  const { id } = useParams();
  const location = useLocation().pathname;
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const userProfile = await axios.get(`/users/find/${id}`);
        setUserData(userProfile.data);
      } catch(err){
        console.log("error",err)
      }
    };
    fetchData();
  }, [id]);
  return( 
  <div>
    {userData?.profilePicture && (
        <img
          src={userData.profilePicture}
          alt="Profile"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      )}
    {userData?.username}
    {userData && (
      <div>
        <p style={{ fontSize:"14px", cursor: 'pointer'}}>
          <div>
            Student of SRM University @ {userData.campus} campus 🎓
          </div>
          <div> 📧
        <a href={`mailto:${userData.email}`}>{userData.email}</a>
          </div>
        {userData.followers.length} Followers
        <span style={{margin: '0 10px'}}></span>
        {userData.following.length} Following
        </p>
      </div>
    )}
    </div>
  )
}

export default Placeholder