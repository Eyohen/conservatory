import React, { useState } from 'react'
import logo from '../assets/TheConservatoryLogo.png'
import { Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLink = ({ to, children }) => (
    <Link to={to}>
      <p className='text-[#5b3e31] text-md py-2'>{children}</p>
    </Link>
  );

  return (
    <div className='bg-[#d8cbc4] px-4 sm:px-9 py-[10px]'>
      <div className='flex justify-between items-center'>
        <img src={logo} alt='Logo' className='object-cover h-[65px] w-[100px]'/>

        <Link to={'/'} className='hidden md:block'>
          <p className='text-[#5b3e31] text-2xl'>THE CONSERVATORY</p>
        </Link>

        <div className='hidden md:flex gap-x-9'>
          <NavLink to='/about'>ABOUT</NavLink>
          <NavLink to='/teamenu'>AFTERNOON TEA MENU</NavLink>
          <NavLink to='/myorders'>MY ORDERS</NavLink>
          <NavLink to='/myaccount'>MY ACCOUNT</NavLink>
          <NavLink to='/giftothers'>GIFT OTHERS</NavLink>
        </div>

        <div className='hidden md:flex gap-x-6 items-center relative'>
          <Link to={'/login'}>
            <div className='bg-[#5b3e31] text-white rounded-full px-3 py-1 cursor-pointer'>
              {user ? `Hello, ${user.fname}` : 'Login'}
            </div>
          </Link>
          
          <div onClick={() => setIsOpen((prev) => !prev)} className='cursor-pointer'>
            <IoChevronDown />
          </div>
          {isOpen && (
            <div className='rounded border border-gray-300 bg-white py-4 px-4 mt-[124px] absolute right-0 w-[200px] z-10'>
              <Link to={'/register'}>
                <p className='font-semibold text-[#5b3e31] mt-2 cursor-pointer'>Create Account</p>
              </Link>
              <p onClick={logout} className='font-semibold text-[#5b3e31] mt-2 cursor-pointer'>
                {user ? 'Log Out' : 'Login'}
              </p>
            </div>
          )}
        </div>

        <div className='md:hidden'>
          <button onClick={toggleMobileMenu} className='text-[#5b3e31]'>
            {isMobileMenuOpen ? <IoMdClose size={25} /> : <RxHamburgerMenu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden mt-4'>
          <NavLink to='/about'>ABOUT</NavLink>
          <NavLink to='/teamenu'>AFTERNOON TEA MENU</NavLink>
          <NavLink to='/myorders'>MY ORDERS</NavLink>
          <NavLink to='/myaccount'>MY ACCOUNT</NavLink>
          <NavLink to='/giftothers'>GIFT OTHERS</NavLink>
          <Link to={'/login'}>
            <div className='bg-[#5b3e31] text-white rounded-full px-3 py-1 mt-2 inline-block'>
              {user ? `Hello, ${user.fname}` : 'Login'}
            </div>
          </Link>
          <Link to={'/register'}>
            <p className='text-[#5b3e31] mt-2 cursor-pointer'>Create Account</p>
          </Link>
          {user && (
            <p onClick={logout} className='text-[#5b3e31] mt-2 cursor-pointer'>Log Out</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar