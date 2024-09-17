import React from 'react'
import Navbar from '../components/Navbar'
import homeImage from '../assets/heroimage.jpg'
import { Link } from "react-router-dom"

const Intro = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div 
        className="flex-grow bg-cover bg-center bg-no-repeat flex justify-center items-center p-4"
        style={{backgroundImage: `url(${homeImage})`}}
      >
        <div className="text-center">
          <Link to="/teamenu">
            <button className="bg-[#d8cbc4] text-[#5b3e31] px-6 sm:px-11 py-3 sm:py-5 text-xl sm:text-2xl transition duration-300 ease-in-out hover:bg-[#c0b0a8] focus:outline-none focus:ring-2 focus:ring-[#5b3e31] focus:ring-opacity-50">
              Make Your Reservation
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Intro