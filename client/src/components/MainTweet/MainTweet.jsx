import React from 'react'
import Send from '@mui/icons-material/SendOutlined';
import TimelinePost from '../TimelinePost/TimelinePost';
const MainTweet = () => {
  return (
    <div>
        <p className="font-bold pl-2 my-2">Username</p>
        <form className="border-b-2 pb-6">
        <textarea
            type="text"
            placeholder="Write your magic!"
            maxLength={300}
            className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button className="py-2 px-4 rounded-full ml-auto">
          <Send color="primary"/>
        </button>
        </form>  
        <TimelinePost />
    </div>
  )
}

export default MainTweet;