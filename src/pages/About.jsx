import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6EADF]">
      <Navbar />
      <div className='flex-grow py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-12'>
        <h1 className='text-center text-2xl sm:text-3xl text-[#5b3e31] font-bold mb-6 sm:mb-8'>About Us</h1>

        <div className='space-y-4 sm:space-y-6 text-[#5b3e31]'>
          <p className='text-lg sm:text-xl'>
            At The Conservatory at Iro Lagos, you have the option to reserve a private afternoon tea
            experience for two. This intimate space is designed with inspiration from traditional English
            tea rooms and offers a combination of delightful English and Nigerian delicacies. Typically,
            an afternoon tea experience includes the following:
          </p>

          <div className='space-y-4 sm:space-y-6 mt-6'>
            <p className='text-lg sm:text-xl'>
              <span className='font-bold'>Tea:</span> Get ready to discover our wide range of exquisite teas. From timeless black and green teas to invigorating herbal blends and enticing flavored varieties, our tea selection caters to every taste.
            </p>
            <p className='text-lg sm:text-xl'>
              <span className='font-bold'>Sandwiches:</span> You can expect dainty, finger-sized sandwiches with a variety of fillings, such as cucumber and cream cheese, to tantalize your taste buds.
            </p>
            <p className='text-lg sm:text-xl'>
              <span className='font-bold'>Scones:</span> These are sweet breads or pastries that are often served with jam or cream.
            </p>
            <p className='text-lg sm:text-xl'>
              <span className='font-bold'>Pastries and Cakes:</span> Treat yourself to an assortment of delectable pastries and cakes. From petite and bite-sized petit fours to luxurious and rich cakes, our sweet treats are the perfect way to conclude your afternoon tea experience.
            </p>
          </div>

          <Link to='/teamenu' className='block mt-6 text-lg text-[#5b3e31] hover:text-blue-500 transition duration-300'>
            Feel free to peruse our menu to choose the afternoon tea experience that suits your preferences.
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About