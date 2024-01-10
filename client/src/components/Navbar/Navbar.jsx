import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import Emoji from '@mui/icons-material/AcUnitOutlined';
import { useLocation } from "react-router-dom";
import Placeholder from '../Placeholder/Placeholder';
import { useState } from "react";
const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;
    return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
      <div className="px-0 md:px-6 mx-auto">
        <SearchIcon className='absolute m-2' color="primary"/>
        <input type="text" placeholder="Search User" className='bg-blue-100 rounded-full py-2 px-8' />
    </div>

    <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center">
         <h2 className='font-bold text-2xl'>
        {location.includes("profile") ? (
              <Placeholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "Explore"
            ) : (
              "Home"
            )}
          </h2>
        <Emoji color='primary' />
    </div>
    </div>
    
    </div>
  );
};

export default Navbar;