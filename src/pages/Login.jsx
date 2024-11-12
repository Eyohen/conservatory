// import React, { useState, useContext } from 'react'
// import { SlGlobe } from "react-icons/sl";
// import logo from '../assets/irologo.jpg'
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
// import { URL } from "../url"
// import { useAuth } from '../context/AuthContext';


// const Login = () => {
//   const { login} = useAuth();

//   const [email, setEmail] = useState('')
//   const [error,setError] = useState(false)
//   const [password, setPassword] = useState('')
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate()

//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   function togglePasswordVisibility() {
//     setIsPasswordVisible((prevState) => !prevState);
//   }


//   const handleSubmit = async() => {
//     //e.preventDefault()
//     setIsLoading(true)
//     try{
//       const res = await axios.post(URL+"/api/auth/login", {email,password})

//       const {accessToken, user} = res.data;
     
//       if(res.status == 200){
//         localStorage.setItem("access_token", accessToken)
//         // localStorage.setItem("currentUser", JSON.stringify(res.data))

//         login(user)
//         console.log(res.data)
//         // setUser(res.data)
//         navigate("/")
//       }
//       setError(false)
//       console.log(res.data)
     
//     }
//     catch(err) {
//       setError(true)
//       console.log(err)
//     } finally {
//       setIsLoading(false)
//     }
// }

//   return (
//     <div>
//     <div className=' flex items-center justify-center h-[100vh]'>
//         <div className='border border-[#D7D7D7] rounded-lg px-[180px] py-[40px] relative'>
//         <img src={logo} alt='' className='mx-auto w-24 h-24'/>
      
//         <p className='pt-6'>Email</p>
//         <input onChange={(e) => setEmail(e.target.value)} className='border border-[#D7D7D7] w-full md:w-[400px] py-2 px-3 rounded-lg hover:border-[#F08E1F]' />

//         <p className='pt-5'>Password</p>

//         <div class="relative w-full md:w-[400px]">
//     <div class="absolute inset-y-0 right-0 flex items-center px-2">
//       {/* <input class="hidden js-password-toggle" id="toggle" type="checkbox" /> */}
//       <label onClick={togglePasswordVisibility} className=" px-2 py-1 text-xl font-mono cursor-pointer text-gray-400" for="toggle">{isPasswordVisible ? (<RiEyeLine />):(<RiEyeOffLine />)}</label>
//     </div>
//     <input onChange={(e) => setPassword(e.target.value)} className="border rounded-lg w-full py-2 px-3 leading-tight hover:border-[#F08E1F] pr-16 font-mono " type={isPasswordVisible ? "text" : "password"} autocomplete="off"
//     />

//   </div>

//   <div className='flex justify-between'>
//     <p className='text-white'>Forgot Password</p>
//     <p className='text-[#F08E1F]'>Forgot Password</p>
//     </div>

//         <div>
//         {/* <p className='text-gray-600 text-sm text-center mt-4'>By clicking sign up, you agree to our <span className='text-[#F08E1F]'>terms and data policy</span></p> */}
//         <button onClick={handleSubmit}  className='bg-[#F7F7F7] text-[#98999A] w-full md:w-[400px] py-2 rounded-2xl mt-6 hover:bg-[#F3D8A7] hover:text-white'>{isLoading ? "Loading..." : "Login"}</button>
//         {error && <h3 className='text-red-500 text-lg text-center'>Something went wrong</h3>}
//         </div>
//         <p className='pt-3 text-center text-[#98999A]'>Don't have an account?   <Link to={'/register'}><span className='text-[#F08E1F] ml-1'>Create an account</span></Link></p>
//         </div>

//     </div>
//     <div className='flex justify-between mb-12 '>
//     <p className='px-6 text-[#6A6B6C]'>Privacy Policy</p>
//     <p className='px-6 text-[#6A6B6C]'>All Rights Reserved © 2024</p>
//     </div>
// </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import logo from '../assets/irologo.jpg'
import { useAuth } from '../context/AuthContext';
import { URL } from "../url";
import axios from 'axios'

const Login = () => {
  const {login, user} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Your existing login logic here
      const res = await axios.post(URL+"/api/auth/login", {email,password})
      const {accessToken, user} = res.data;
     
           if(res.status == 200){
             localStorage.setItem("access_token", accessToken)
             // localStorage.setItem("currentUser", JSON.stringify(res.data))
      
             login(user)
             console.log(res.data)
             // setUser(res.data)
              navigate("/")
            }
      setError(false);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src={logo}
                alt="Logo"
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08E1F] focus:border-transparent transition-colors hover:border-[#F08E1F]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-[#F08E1F] focus:border-transparent transition-colors hover:border-[#F08E1F]"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {isPasswordVisible ? (
                      <RiEyeOffLine className="h-5 w-5 text-gray-400" />
                    ) : (
                      <RiEyeLine className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link 
                  to="/forgot-password"
                  className="text-[#F08E1F] hover:text-[#F3D8A7] text-sm transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-2xl text-[#98999A] bg-[#F7F7F7] hover:bg-[#F3D8A7] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F08E1F] disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  Something went wrong
                </div>
              )}

              <p className="text-center text-[#98999A] text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/register"
                  className="text-[#F08E1F] hover:text-[#F3D8A7] transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between text-[#6A6B6C] text-sm">
          <p>Privacy Policy</p>
          <p>All Rights Reserved © 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;