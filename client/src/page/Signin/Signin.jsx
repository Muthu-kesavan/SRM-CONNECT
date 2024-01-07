import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from '../../redux/userSlice';
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Signin = () => {
  const [register_no, setRegister_no] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) =>{
    e.preventDefault();
    dispatch(loginStart());
    try{
      const res = await axios.post("auth/signin", { register_no, password });
      dispatch(loginSuccess(res.data));
      const {username} = res.data;
      toast.success(`Welcome back ${username.toUpperCase()}`);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err){
      dispatch(loginFailed());
      toast.error("Wrong Credentials");
      console.log(err);
    }
  };
  return (
  <div>
    <ToastContainer />
    <form className="bg-gray-100 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
     <h2 className="text-3xl font-bold text-center text-[#5FBDFF] ">LOG IN</h2>

     <input
     onChange={(e)=> setRegister_no(e.target.value)}
     type="text"
     placeholder="Register Number"
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#5FBDFF]"
     />
     <input
     onChange={(e)=> setPassword(e.target.value)}
     type="password"
     placeholder="Password"
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <button className="bg-[#5FBDFF] text-[white] font-[bold] cursor-pointer text-base uppercase px-8 py-4 rounded-[0.4rem] border-[none] hover:bg-[#2196F3] rounded md"
     onClick={handleLogin}>
       Log in
     </button>
     <span className="apply text-center uppercase text-[#5FBDFF]">Don't have an account ? 
     </span>
     <span className='text-right'>
      <Link to="/signup" className="apply uppercase text-[#5FBDFF] hover:text-[#2196F3]"> Create One -&gt;</Link>
      </span>
    </form>
    </div>
  )
}

export default Signin;

