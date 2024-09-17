import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const About = () => {
  return (

    <>
    <Navbar/>
    <div className='bg-[#F6EADF] py-12'>
        <p className='text-center text-3xl text-[#5b3e31]'>About Us</p>


<div className='py-9'>
        <p className='text-left text-[#5b3e31] text-2xl py-2 px-[400px]'>At The Conservatory at Iro Lagos, you have the option to reserve a private afternoon tea.</p>
        <p className='text-left text-[#5b3e31] text-2xl py-2 px-[400px]'>experience for two. This intimate space is designed with inspiration from traditional English</p>
        <p className='text-left text-[#5b3e31] text-2xl py-2 px-[400px]'>tea rooms and offers a combination of delightful English and Nigerian delicacies. Typically,</p>
        <p className='text-left text-[#5b3e31] text-2xl py-2 px-[400px]'>an afternoon tea experience includes the following:</p>

<p className='text-left text-[#5b3e31] text-2xl py-9 px-[400px]'><span className='font-bold'>Tea :</span>  Get ready to discover our wide range of exquisite teas. From timeless black and green teas to invigorating herbal blends and enticing flavored varieties, our tea selection caters to every taste</p>
<p className='text-left text-[#5b3e31] text-2xl py-2 px-[400px]'><span className='font-bold'>Sandwiches :</span>You can expect dainty, finger-sized sandwiches with a variety of fillings, such as cucumber and cream cheese, to tantalize your taste buds.</p>
<p className='text-left text-[#5b3e31] text-2xl py-2 px-[400px]'><span className='font-bold'>Scones :</span>These are sweet breads or pastries that are often served with jam or cream.</p>
<p className='text-left text-[#5b3e31] text-2xl py-2 px-[400px]'><span className='font-bold'>Pastries and Cakes :</span>Treat yourself to an assortment of delectable pastries and cakes. From petite and bite-sized petit fours to luxurious and rich cakes, our sweet treats are the perfect way to conclude your afternoon tea experience.</p>

<Link to={'/teamenu'}><p className='text-left text-[#5b3e31] text-lg py-2 px-[400px] hover:text-blue-500'>Feel free to peruse our menu to choose the afternoon tea experience that suits your preferences.</p></Link>
    </div>

    </div>
    </>
  )
}

export default About