import React from 'react'
import { Link } from "react-router-dom";


const Signin = () => {
  return (
    <form className="bg-gray-50 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
     <h2 className="text-3xl font-bold text-center text-[#5FBDFF] ">Sign in</h2>

     <input
     type="text"
     placeholder="Register Number"
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <input
     type="password"
     placeholder="Password"
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <button className="bg-[#5FBDFF] text-[white] font-[bold] cursor-pointer text-base uppercase px-8 py-4 rounded-[0.4rem] border-[none] hover:bg-[#2196f3]">
       Sign in
     </button>
     <span className="apply text-[#5FBDFF] uppercase">Don't have an account ? 
      <Link to="/signup" className="text-[#2196f3] no-underline font-[bold]"> Create One</Link>
     </span>
    </form>
  )
}

export default Signin;
