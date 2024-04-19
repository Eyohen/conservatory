import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import axios from "axios"
import { URL } from '../url';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { SlArrowLeft } from "react-icons/sl";


import "react-datepicker/dist/react-datepicker.css";

const BookingItem = () => {
    const {id: contactId} = useParams()
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



    const getReservation = async () => {

  
        try {

        
          const res =  await axios.get(URL+"/api/bookings/"+contactId)
          console.log(res.data)
          setItems(res.data)
        //   console.log(reservation)
        }
        catch(err){
          console.log(err)
        }
    
    } 
    

     useEffect(() => {
        getReservation()
     },[contactId])
  return (
  
    <div className=' h-screen'>
      <div className='p-6'>
          
        </div>
        <p className='text-center font-bold text-xl mt-6 text-[#F08E1F]'>Booking Detail</p>
    

            <div className='flex flex-col mx-auto items-center justify-center mt-16 space-y-4'>
            <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>First Name: {items?.existing_user?.firstName}</p>
           <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>Last Name: {items?.existing_user?.lastName}</p>
            <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>Email: {items?.existing_user?.email}</p>
            <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>date: {new Date(items.booking?.date).toDateString()}</p>
           <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>time: {items?.booking?.time}</p>
            <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>menu: {items?.booking?.menu}</p>
           <p className='bg-[#F08E1F] font-bold rounded-lg border border-gray-300 px-6 py-2 text-white'>crockery: {items?.booking?.crockery}</p>



      <div>
            <div onClick={() => navigate(-1)} className="flex items-center space-x-3 px-12 mt-9">
        <SlArrowLeft color='gray' />
        <h1 className='text-md text-gray-400 font-md cursor-pointer'>go back</h1>
        </div> 
        </div>


        </div>



      


     
       
  


    </div>

  )
}

export default BookingItem


