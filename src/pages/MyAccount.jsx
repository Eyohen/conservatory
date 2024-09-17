import React from 'react'
import Navbar from '../components/Navbar'

const MyAccount = () => {
  return (
    <>
    <Navbar />
    <div className='bg-[#F6EADF] py-4'>

        <p className='text-center text-2xl text-[#5b3e31]'>My Account</p>

<div className='flex flex-col justify-center items-center'>
        <p className='pt-24'>First Name</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='Simisola'/>
        <p className='pt-6'>Last Name</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='Asiwaju'/>

        <p className='pt-6'>Email</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='simi@gmail.com'/>

        <p className='pt-6'>Old Password</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='********'/>
        <p className='pt-6'>Change Password</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2'/>
        <p className='pt-6'>Confirm New Password</p>
        <input className='border border-[#5b3e31] w-[350px] py-1 px-2'/>
      

        </div>
    
    <div className='mb-[220px]'></div>
    </div>
    </>
   
  )
}

export default MyAccount