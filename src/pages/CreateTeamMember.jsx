import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import logo from '../assets/irologo.jpg'
import axios from 'axios'
import { URL } from "../url"
import { useNavigate } from 'react-router-dom'

const CreateTeamMember = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Your existing registration logic here
      const res = await axios.post(`${URL}/api/auth/register`, {firstName, lastName, email, password, role})
      setError(false);
      console.log(res.data)
      navigate("/admintable")
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
          <p className='text-xl flex justify-center'>Create Team Member</p>
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
                  htmlFor="firstName" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08E1F] focus:border-transparent transition-colors hover:border-[#F08E1F]"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label 
                  htmlFor="lastName" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08E1F] focus:border-transparent transition-colors hover:border-[#F08E1F]"
                  placeholder="Enter your last name"
                />
              </div>

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


              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-2xl text-[#98999A] bg-[#F7F7F7] hover:bg-[#F3D8A7] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F08E1F] disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Create Team Member"}
              </button>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  Something went wrong
                </div>
              )}

              
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

export default CreateTeamMember;