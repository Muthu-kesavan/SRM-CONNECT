import React from 'react'
import Form from "react-bootstrap/Form";

const Register = () => {
  return (
    <form className="bg-gray-50 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
     <h2 className="text-3xl font-bold text-center text-[#5FBDFF] ">Sign up</h2>

     <input
     type="text"
     placeholder="Name"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <input
     type="email"
     placeholder="Offical Email"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <input
     type="text"
     placeholder="Register No"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <Form.Select label="campus" required className='bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]'>
     <option className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     >Your Campus </option>
        <option value="1">KTR</option>
        <option value="2">RMP</option>
        <option value="3">VDP</option>
        <option value="4">NCR</option>
     </Form.Select>
     <input
     type="password"
     placeholder="Password"
     required
     className="bg-transparent text w-full text-base p-4 rounded-[0.4rem] border-[0.1rem] border-solid focus:border-[0.1rem] focus:border-solid focus:border-[#2196f3]"
     />
     <button className="bg-[#5FBDFF] text-[white] font-[bold] cursor-pointer text-base uppercase px-8 py-4 rounded-[0.4rem] border-[none] hover:bg-[#2196f3]">
       Sign up
     </button>
     
    </form>
  )
}

export default Register