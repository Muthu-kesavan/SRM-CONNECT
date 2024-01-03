import React from 'react';
import axios from "axios";
import {useDispatch, useSelector } from "react-redux";
const EditProfile = ({setOpen}) => {
    const {currentUser} = useSelector((state)=> state.user);
  return <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
    <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button 
        onClick={()=> setOpen(false)}
        className='absolute top-3 right-3 cursor-pointer'>
            X
        </button> 
        <h2 className='font-bold text-xl'>Edit Profile</h2>
        <p> choose a new profile picture</p>
    </div>
    EditProfile</div>
  
};

export default EditProfile