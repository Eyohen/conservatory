// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import { URL } from '../url'
// import axios from 'axios'
// import { useAuth } from '../context/AuthContext'

// const MyAccount = () => {
//   const {user} = useAuth()
//   const [profile, setProfile] = useState([])
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')

//   const fetchUser = async () =>{
//     const res = await axios.get(`${URL}/api/users/${user?.id}`)

//     setFirstName(res.data.firstName)
//     setLastName(res.data.lastName)
//     setEmail(res.data.email)
//   }

//   useEffect(() =>{
//     fetchUser()
//   },[])


//   return (
//     <>
//     <Navbar />
//     <div className='bg-[#F6EADF] py-4 h-[100vh]'>

//         <p className='text-center text-2xl text-[#5b3e31]'>My Account</p>

// <div className='flex flex-col justify-center items-center'>
//         <p className='pt-24'>First Name</p>
//         <input value={firstName} className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='Simisola'/>
//         <p className='pt-6'>Last Name</p>
//         <input value={lastName} className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='Asiwaju'/>

//         <p className='pt-6'>Email</p>
//         <input value={email} className='border border-[#5b3e31] w-[350px] py-1 px-2' placeholder='simi@gmail.com'/>

//         </div>
    
//     <div className='mb-[220px]'></div>
//     </div>
//     </>
   
//   )
// }

// export default MyAccount

import React, { useEffect, useState } from 'react';
import { User, Mail, Edit2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { URL } from '../url';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MyAccount = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${user?.id}`);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your update logic here
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-orange-900">My Account</h1>
            {/* <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Edit2 size={18} />
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button> */}
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Profile Avatar */}
            <div className="bg-orange-50 px-6 py-8">
              <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center mx-auto">
                <User size={48} className="text-orange-800" />
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name Fields Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label 
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label 
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;