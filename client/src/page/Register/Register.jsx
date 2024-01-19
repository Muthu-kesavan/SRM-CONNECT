import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
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
  const [showPassword, setShowPassword] = useState(false);
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
      toast.success("Account created Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1900,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: '#5FBDFF',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '12px', 
          fontFamily: 'Bree Serif, serif',
        },
      });;
      setTimeout(()=>{
        navigate("/");
      },2000);
    }catch(err){
      dispatch(loginFailed());
      toast.error('Registration failed. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: '#ff6347',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '12px', 
          fontFamily: 'Bree Serif, serif',
        },
      });
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
        
      </ select>
      <div className="relative">
          <input
            onChange={handleInputChange}
            value={formData.password}
            name="password"
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password"
            required
            className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
          />
          <span
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-4 top-3 cursor-pointer"
          >
            
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.071 4.929a16 16 0 010 22.142M4.929 19.071a16 16 0 010-22.142M14 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15a7 7 0 01-7-7m14 0a7 7 0 00-7-7m7 7a7 7 0 01-7 7m7 7a7 7 0 00-7-7m11-4a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </span>
        </div>


     <button
     onClick={handleSignup}
     className="bg-[#5FBDFF] text-[white] font-[bold] cursor-pointer text-base uppercase px-8 py-4 rounded-[0.4rem] border-[none] hover:bg-[#2196f3]">
       Sign up
     </button>
     <Link to="/signin" className="apply  text-[#5FBDFF] hover:text-[#2196F3] hover:underline">&lt;- Back to Login</Link>
    </form>
    </div>
  )
}

export default Register
