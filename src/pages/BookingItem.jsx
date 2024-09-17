import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import axios from "axios"
import { URL } from '../url';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { SlArrowLeft } from "react-icons/sl";


import "react-datepicker/dist/react-datepicker.css";

const BookingItem = () => {
    const {id: bookingId} = useParams()
    // const [startDate, setStartDate] = useState(new Date());
    const [pickUp, setPickUp] = useState("")
    const [arrival, setArrival] = useState("")
    const [time, setTime] = useState("")
    // const [date, setDate] = useState("")
    const [vehicle, setVehicle] = useState("")
    const [passengers, setPassengers] = useState("")
    const [airport, setAirport] = useState("")
    const [flightNum, setFlightNum] = useState("")
    const [items, setItems] = useState([])
    const navigate=useNavigate()



    const getBooking = async () => {

        try {
          const res =  await axios.get(URL+"/api/bookings/"+bookingId)
          console.log("geting booking item",res.data)
          setItems(res.data)
        //   console.log(reservation)
        }
        catch(err){
          console.log(err)
        }
    
    } 
    

     useEffect(() => {
        getBooking()
     },[bookingId])
  return (
  
    <div className=' h-screen'>
      <div className='p-6'>
          
        </div>
        <p className='text-center font-bold text-2xl mt-6 text-[#F08E1F]'>Booking Detail</p>
    

            <div className='flex flex-col mx-auto items-center justify-center mt-16 space-y-4'>
            <p className='border border-[#F08E1F] font-medium rounded-lg px-32 py-4 text-[#F08E1F]'>Email: {items?.email}</p>
           {/* <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>Last Name: {items?.existing_user?.lastName}</p> */}
            {/* <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>Email: {items?.existing_user?.email}</p> */}
            <p className='border border-[#F08E1F] font-medium rounded-lg px-32 py-4 text-[#F08E1F]'>date: {new Date(items.createdAt).toDateString()}</p>
           <p className='border border-[#F08E1F] font-medium rounded-lg px-32 py-4 text-[#F08E1F]'>time: {items?.time}</p>
            <p className='border border-[#F08E1F] font-medium rounded-lg px-32 py-4 text-[#F08E1F]'>menu: {items?.menu}</p>
           <p className='border border-[#F08E1F] font-medium rounded-lg px-32 py-4 text-[#F08E1F]'>crockery: {items?.crockery}</p>



      <div>
            <div onClick={() => navigate(-1)} className="flex items-center space-x-3 px-12 mt-9">
        <SlArrowLeft color='gray' />
        <h1 className='text-xl text-gray-400 font-md cursor-pointer'>go back</h1>
        </div> 
        </div>


        </div>



      


     
       
  


    </div>

  )
}

export default BookingItem


