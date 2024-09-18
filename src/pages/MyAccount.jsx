import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { URL } from '../url'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const MyAccount = () => {
  const {user} = useAuth()
  const [profile, setProfile] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const fetchUser = async () =>{
    const res = await axios.get(`${URL}/api/users/${user?.id}`)

    setFirstName(res.data.firstName)
    setLastName(res.data.lastName)
    setEmail(res.data.email)
  }

  useEffect(() =>{
    fetchUser()
  },[])


  return (
    <>
    <Navbar />
    <div className='bg-[#F6EADF] py-4 h-[100vh]'>

        <p className='text-center text-2xl text-[#5b3e31]'>My Account</p>

<div className='flex flex-col justify-center items-center'>
        <p className='pt-24'>First Name</p>
        <input value={firstName} className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='Simisola'/>
        <p className='pt-6'>Last Name</p>
        <input value={lastName} className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='Asiwaju'/>

        <p className='pt-6'>Email</p>
        <input value={email} className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='simi@gmail.com'/>

        {/* <p className='pt-6'>Old Password</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='********'/>
        <p className='pt-6'>Change Password</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2'/>
        <p className='pt-6'>Confirm New Password</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2'/> */}
      

        </div>
    
    <div className='mb-[220px]'></div>
    </div>
    </>
   
  )
}

export default MyAccount