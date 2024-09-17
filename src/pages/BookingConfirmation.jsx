import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { URL } from '../url'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const BookingConfirmation = () => {

    const { user, logout } = useAuth();
    const [book, setBook] = useState('');
    const bookId = useParams().id

    const name = user?.fname;

    const fetchBooking = async () => {
        try {

        const res = await axios.get(`${URL}/api/bookings/${bookId}`);
          setBook(res.data);
          console.log("check booking here",res.data);
        }catch (err){
            console.log(err)
          }
        }
      useEffect(() => {
        fetchBooking();
      }, [])

  return (
    <>
    <Navbar />
    <div className='bg-[#F6EADF] py-4'>
        
    <p className='text-center text-2xl text-[#5b3e31]'>Booking Confirmation</p>
    <div className='px-24'>

<p className='text-left text-xl text-[#5b3e31] mt-9'>Hi {name},</p>

<p className='text-left text-xl text-[#5b3e31] mt-2'>Your booking is confirmed! Here are you details:</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Date: {new Date(book.date).toLocaleDateString()}.</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Email: {book?.email}.</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Time: {book.time}.</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Location: 7/12 Rumens roads, Ikoyi.</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Menu: {book.menu}.</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Tea: {book.tea}</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Crockery: {book?.crockery ? book?.crockery : "none"}</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Coffee: {book?.coffee ? book?.coffee : "none" }</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Ice Tea: {book?.iceTea ? book?.iceTea : "none"}</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Amount Paid: ₦{book.price}.</p>

<p className='text-left text-lg text-[#5b3e31] mt-2'>Enjoy your reservation.</p>
      </div>

      </div>
    </>
  )
}

export default BookingConfirmation