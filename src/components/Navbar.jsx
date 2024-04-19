import React, { useState, useEffect, useContext } from 'react'
import logo from '../assets/irologo.jpg'
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IF, URL } from "../url"
import { IoChevronDown } from "react-icons/io5";
import {UserContext} from '../context/UserContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  
  const [isOpen, setIsOpen] = useState(false)

  const logOut = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentUser");
    setData(null)
    navigate("/login")
  }  

  const {user}=useContext(UserContext)

  const fetchProfile = async () => {
    try{
      const accessToken = localStorage.getItem("access_token")
      const currentUser = JSON.parse(localStorage.getItem("currentUser"))
      console.log(typeof currentUser)


      if(!currentUser){
        return ;
      }


      if(!accessToken){
        // Handle the case where the access token is not available
    console.error('Access token not found')
  }

       const res = await axios.get(URL+"/api/users/"+currentUser?._id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      
       console.log(res.data)
       setData(res.data)
    }
    catch(err){
       console.log(err)
    }
  }
  

  useEffect(()=>{
    fetchProfile()
  
  },[])




  return (
    <div className='flex justify-between px-9 mt-9 items-center'>
        <img src={logo} alt='' className='object-cover w-[120px] h-[80px]'/>

        <p className='text-[#ffb640] text-2xl'>THE CONSERVATORY</p>


<div className='flex gap-x-6 items-center relative'>
  {user? <div className='bg-[#ffb640] text-white rounded-full px-3 py-1'>Hello, {data?.firstName} </div> : <div className='bg-[#ffb640] text-white rounded-full px-3 py-1'>Login </div>}
        
        <div onClick={() => setIsOpen((prev) => !prev)}><IoChevronDown /></div>
        {isOpen && (<div  className='rounded border border-gray-300 bg-white py-4 px-4 mt-[124px] absolute right-0 w-[200px]'>
        <Link to={'/allmybookings'}><p className='font-semibold text-[#ffb640]'>See my bookings</p></Link>
        <p onClick={logOut} className='font-semibold text-[#ffb640] mt-2 cursor-pointer'>{user? 'Log Out' : 'Login'}</p>

</div>)}
        </div>
       
    </div>
  )
}

export default Navbar