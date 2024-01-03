import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from '../../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    register_no: '',
    campus: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async(e)=>{
    e.preventDefault();
    dispatch(loginStart());

    const { username, email, register_no, campus, password } = formData;

    if (
      !username ||username.length < 3 ||
      !email ||
      !/^[a-zA-Z]{2}\d{4}@srmist\.edu\.in$/.test(email) ||
      !register_no ||
      !/^[a-zA-Z]{2}\d{13}$/.test(register_no) ||
      !campus ||
      !password
    ) {
      return toast.error('Please enter valid details.');
    }

    try{
      const res = await axios.post("/auth/signup",{username, email, register_no,campus,password});
      dispatch(loginSuccess(res.data));
      toast.success("Account created Successfully");
      setTimeout(()=>{
        navigate("/");
      },1000);
    }catch(err){
      dispatch(loginFailed());
      toast.error('Registration failed. Please try again.');
    }

  };

  return (
    <div>
    <ToastContainer />
    <form className="bg-gray-100 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
     <h2 className="text-3xl font-bold text-center text-[#5FBDFF] ">Sign Up</h2>

     <input
     onChange={handleInputChange}
     value={formData.username}
     name="username"
     type="text"
     placeholder="Name"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <input
     onChange={handleInputChange}
     value={formData.email}
     name="email"
     type="email"
     placeholder="Official Email"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <input
     onChange={handleInputChange}
     value={formData.register_no}
     name="register_no"
     type="text"
     placeholder="Register No"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <select
        value={formData.campus}
        onChange={handleInputChange}
        name="campus"
        required
        className='bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]'
      >
        <option value="">Your Campus</option> 
        <option value="KTR">KTR</option>
        <option value="RMP">RMP</option>
        <option value="VDP">VDP</option>
        <option value="NCR">NCR</option>
      </select>

     <input
     onChange={handleInputChange}
     value={formData.password}
     name="password"
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
    </div>
  )
}

export default Register