import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ExploreIcon from '@mui/icons-material/ExploreOutlined';
import PersonIcon from '@mui/icons-material/InsertEmoticonOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { Tooltip } from '@mui/material';
const LeftSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
      <div className="mt-6 flex flex-col space-y-4 relative">
          <SearchIcon className="absolute m-6" color="primary" />
        <input
          type="text"
          placeholder="         Search User"
          className="bg-blue-100 rounded-full py-2 px-8 focus:outline-none focus:ring focus:border-blue-400"
        />
        <Link to="/">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <HomeIcon fontSize="large" color="primary" />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/explore">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <ExploreIcon fontSize="large" color="primary" />
            <p>Explore</p>
          </div>
        </Link>
        {currentUser?._id && (
          <Link to={`https://dataflow-412p.onrender.com/profile/${currentUser._id}`}>
            <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
              <PersonIcon fontSize="large" color="primary" />
              <p>Profile</p>
            </div>
          </Link>
        )}
        <div className="flex justify-between">
            <div>
              <p className="font-bold">{currentUser.username}</p>
              <Tooltip title="Campus" arrow>
                <p className="font italic"> @{currentUser.campus}</p>
              </Tooltip>
            </div>
      
          <div>
            <Link to="signin">
              <button
                className="bg-red-500 px-4 py-2 text-white rounded-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default LeftSidebar;