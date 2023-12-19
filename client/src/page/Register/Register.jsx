import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from '../../redux/userSlice';
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [register_no, setRegister_no] = useState("");
  const [password, setPassword] = useState("");
  const [campus, setCampus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async(e)=>{
    e.preventDefault();
    dispatch(loginStart());
    try{
      const res = await axios.post("/auth/signup",{username, email, register_no,campus,password});
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch(err){
      dispatch(loginFailed());
    }

  };

  return (
    <form className="bg-gray-50 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
     <h2 className="text-3xl font-bold text-center text-[#5FBDFF] ">Sign Up</h2>

     <input
     onChange={(e)=> setUsername(e.target.value)}
     type="text"
     placeholder="Name"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <input
     onChange={(e)=> setEmail(e.target.value)}
     type="email"
     placeholder="Offical Email"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <input
     onChange={(e)=> setRegister_no(e.target.value)}
     type="text"
     placeholder="Register No"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <select
        value={campus} 
        onChange={(e) => setCampus(e.target.value)}
        required
        className='bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]'
      >
        <option value="">Your Campus*</option> {/* Default option */}
        <option value="KTR">KTR</option>
        <option value="RMP">RMP</option>
        <option value="VDP">VDP</option>
        <option value="NCR">NCR</option>
      </select>

     <input
     onChange={(e)=> setPassword(e.target.value)}
     type="password"
     placeholder="Password"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <button
     onClick={handleSignup}
     className="bg-[#5FBDFF] text-[white] font-[bold] cursor-pointer text-base uppercase px-8 py-4 rounded-[0.4rem] border-[none] hover:bg-[#2196f3]">
       Sign up
     </button>
    </form>
  )
}

export default Register