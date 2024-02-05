import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailed } from '../../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [register_no, setRegister_no] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('https://dataflow-412p.onrender.com/auth/signin', { register_no, password });
      dispatch(loginSuccess(res.data));
      const { username } = res.data;
      toast.success(`Welcome back ${username.toUpperCase()}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1800,
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
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      dispatch(loginFailed());
      toast.error('Wrong Credentials', {
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
      console.log(err);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form className="bg-gray-100 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
        <h2 className="text-3xl font-bold text-center text-[#5FBDFF]">LOG IN</h2>

        <input
          onChange={(e) => setRegister_no(e.target.value)}
          type="text"
          placeholder="Register Number"
          className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#5FBDFF]"
        />
        <div className="relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password"
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
          className="bg-[#5FBDFF] text-[white] font-[bold] cursor-pointer text-base uppercase px-8 py-4 rounded-[0.4rem] border-[none] hover:bg-[#2196F3] rounded md"
          onClick={handleLogin}
        >
          Log in
        </button>
        <span className="apply text-center uppercase text-[#5FBDFF]">Don't have an account ?</span>
        <span className="text-right">
          <Link to="/signup" className="apply  text-[#5FBDFF] hover:text-[#2196F3] hover:underline"> Create One -&gt;</Link>
        </span>
      </form>
    </div>
  );
};

export default Signin;
