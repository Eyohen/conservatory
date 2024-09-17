import React, { useState, useContext } from 'react'
import { SlGlobe } from "react-icons/sl";
import logo from '../assets/irologo.jpg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import PhoneInput from 'react-phone-input-2';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-input-2/lib/style.css'
// import  'react-phone-number-input/style.css'
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { URL } from "../url"
import { useAuth } from '../context/AuthContext';







const Login = () => {

  const { login} = useAuth();

  const [email, setEmail] = useState('')

  const [error,setError] = useState(false)

  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }



  const handleSubmit = async() => {
    //e.preventDefault()



    setIsLoading(true)
    try{
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
      setError(false)
      console.log(res.data)
     
    }
    catch(err) {
      setError(true)
      console.log(err)
    } finally {
      setIsLoading(false)
    }

}






  return (
    <div>
    <div className=' flex items-center justify-center h-[100vh]'>



        <div className='border border-[#D7D7D7] rounded-lg px-[180px] py-[40px] relative'>
        <img src={logo} alt='' className='mx-auto w-24 h-24'/>

 
      
        <p className='pt-6'>Email</p>
        <input onChange={(e) => setEmail(e.target.value)} className='border border-[#D7D7D7] w-full md:w-[400px] py-2 px-3 rounded-lg hover:border-[#F08E1F]' />

       

        <p className='pt-5'>Password</p>

        <div class="relative w-full md:w-[400px]">
    <div class="absolute inset-y-0 right-0 flex items-center px-2">
      {/* <input class="hidden js-password-toggle" id="toggle" type="checkbox" /> */}
      <label onClick={togglePasswordVisibility} className=" px-2 py-1 text-xl font-mono cursor-pointer text-gray-400" for="toggle">{isPasswordVisible ? (<RiEyeLine />):(<RiEyeOffLine />)}</label>
    </div>
    <input onChange={(e) => setPassword(e.target.value)} className="border rounded-lg w-full py-2 px-3 leading-tight hover:border-[#F08E1F] pr-16 font-mono " type={isPasswordVisible ? "text" : "password"} autocomplete="off"
    />

  </div>

  <div className='flex justify-between'>
    <p className='text-white'>Forgot Password</p>
    <p className='text-[#F08E1F]'>Forgot Password</p>
    </div>

       



        <div>
        {/* <p className='text-gray-600 text-sm text-center mt-4'>By clicking sign up, you agree to our <span className='text-[#F08E1F]'>terms and data policy</span></p> */}
        <button onClick={handleSubmit}  className='bg-[#F7F7F7] text-[#98999A] w-full md:w-[400px] py-2 rounded-2xl mt-6 hover:bg-[#F3D8A7] hover:text-white'>{isLoading ? "Loading..." : "Login"}</button>
        {error && <h3 className='text-red-500 text-lg text-center'>Something went wrong</h3>}
        </div>
        <p className='pt-3 text-center text-[#98999A]'>Don't have an account?   <Link to={'/register'}><span className='text-[#F08E1F] ml-1'>Create an account</span></Link></p>
        </div>

    </div>
    <div className='flex justify-between mb-12 '>
    <p className='px-6 text-[#6A6B6C]'>Privacy Policy</p>
    <p className='px-6 text-[#6A6B6C]'>All Rights Reserved © 2024</p>
    </div>
</div>
  )
}

export default Login