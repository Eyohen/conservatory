import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from '../components/Modal';
import { ImCross } from 'react-icons/im'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { URL } from '../url';
import AsyncSelect from 'react-select/async'
import { IoChevronDown } from "react-icons/io5";
import { PaystackButton } from 'react-paystack';
import { useAuth } from '../context/AuthContext';
import axios from "axios"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
const animatedComponents = makeAnimated()

// import { format } from 'date-fns';
import moment from 'moment';


const times = [
  {
    id: 1,
    time: "11:30am - 1:30pm",
   

  },
  {
    id: 2,
    time: "2pm - 4pm",
  },
  {
    id: 3,
    time: "4:30pm - 6:30pm",
  },

]


const menus = [
  {
    _id: 1,
    menu: "English Tea",
  },
  {
    _id: 2,
    menu: "Cream Tea",
  },
  {
    _id: 3,
    menu: "Royal Tea",
  },
  {
    _id: 4,
    menu: "Celebration Tea",
  },
]




const MakeBooking = () => {
  const { search } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState([])
  const [menu, setMenu] = useState([])
  const [selectedMenu, setSelectedMenu] = useState([])
  const [pickmenu, setPickMenu] = useState([])
  const [selectedPickMenu, setSelectedPickMenu] = useState([])
  const [crockery, setCrockery] = useState([])
  const [price, setPrice] = useState('')
  const [selectedCrockery, setSelectedCrockery] = useState([])
  const [pickcrockery, setPickCrockery] = useState([])
  const [selectedPickCrockery, setSelectedPickCrockery] = useState([])
  const [time, setTime] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const [test, setTest] = useState('')
  const [email, setEmail] = useState('')
  // const bookingId = useParams().id;

  const navigate = useNavigate()

  const publicKey = "pk_test_6fa7dbd015006b4b712c4d8bfedcd53cb4f93320"

  var today = new Date();
  var dd = today.getDate() + 2;

  // If the resulting day is Sunday, skip it and go to Monday
  if (today.getDay() === 0) {
    today.setDate(today.getDate() + 1); // Increment by one more day to skip Sunday
  }

  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  // today = yyyy + '-' + mm + '-' + dd;
  // today = mm + '-' + dd + '-' + yyyy;
  today = dd + '-' + 'mm' + '-' + yyyy;
  var minDate = "1993-05-25"

  console.log(today)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)


  const handleTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleMenu2 = (e) => {
    setSelectedPickMenu(e.target.value);
  };

  const handleCrockery2 = (e) => {
    setSelectedPickCrockery(e.target.value);
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.get(URL + "/api/menus/" + search);
      setMenu(res.data);
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPickMenu = async () => {
    try {
      const res = await axios.get(URL + "/api/menus/");
      setPickMenu(res.data);
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchPickMenu();
  },[] );




  const fetchCrockery = async () => {
    try {
      const res = await axios.get(URL + "/api/crockerys/");
      setCrockery(res.data);
      console.log("very soon henry".res.data)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPickCrockery = async () => {
    try {
      const res = await axios.get(URL + "/api/crockerys/");
      setPickCrockery(res.data);
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCrockery();
    fetchPickCrockery();
  }, []);




  const handleMenu = (event) => {
    // setSelectedMenu(e.target.value);
    const selectedMenuItem = menu.find(men => men.title === event.target.value);
    if (selectedMenuItem) {
      setSelectedMenu(event.target.value);
      navigate(`/menudetail/${selectedMenuItem.id}`);
    } else {
      console.log("Menu not found");
      // Handle cases where the menu item isn't found
    }
  };


  const handleCrockery = (event) => {
    // setSelectedMenu(e.target.value);
    const selectedCrockeryItem = crockery.find(men => men.crockery === event.target.value);
    if (selectedCrockeryItem) {
      setSelectedCrockery(event.target.value);
      navigate(`/crockerydetail/${selectedCrockeryItem.id}`);
    } else {
      console.log("Crockery not found");
      // Handle cases where the menu item isn't found
    }
  };

  //restriction for if the user is not logged in so they dont book
  const { isAuthenticated } = useAuth();

  const handleBooking = async () => {
    setIsLoading(true)
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        // Handle the case where the access token is not available
        console.error('Access token not found')
      }
      const res = await axios.post(URL + "/api/bookings/create", { time:selectedTime, menu:selectedPickMenu, date:startDate, price, email }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      console.log("Henry booking",res.data)
      const bookingId = res.data.record.id
      const amount = res.data.record.price
      if(bookingId && amount) {
       
        const response = await axios.post(URL + "/api/payments/create", { amount, bookingId }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        console.log("checking payment",response.data)
      }
    
      console.log("we are looking",bookingId)
      setSelectedTime(res.data.time)
      setDate(res.data.date)
      setError(false)
      navigate("/")
    }
    catch (err) {
      setError(true)
      console.log(err)
    } finally {
      setIsLoading(false)

    }

  }

  const paymentProps = {
    email,
    time:selectedTime, 
    menu:selectedPickMenu,
    date:startDate, 
    amount:price * 100,
    publicKey,
    text:"Make Booking",
    // onSuccess: () => alert("Thank you for booking!!"),
    onClose: () => alert("Are you sure you want to close"),
    onSuccess: ({ reference }) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
      handleBooking();
    },
    

  }





  return (
    <div>
      <Navbar />


      <div className='flex flex-col justify-center gap-x-11 mt-24'>

          <p className='text-center text-[#ffb640] text-lg '>BOOK A SESSION</p>
          <p className='mt-4 text-gray-400 max-w-[400px] mx-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          {/* <button onClick={openModal} className='bg-[#ffb640] text-white px-2 py-1 cursor-pointer mt-4'>CHECK AVAILABILITY</button>


          <Modal isOpen={isModalOpen} onClose={closeModal} title="Baby" /> */}

<div className='w-[350px] mx-auto mt-9'>
          <DatePicker selected={startDate}
              onChange={(date) => setStartDate(date)}
              //  minDate={new Date("04-13-2024")}
              minDate={today}
              dateFormat="dd/MM/yyyy"

              className='border border-gray-300 text-gray-500 px-2 py-1 w-[350px]' />
              </div>

   
            <select value={selectedTime} onChange={handleTime} className="border border-gray-300 text-gray-500 px-2 py-1 w-[350px] mx-auto mt-9">
              <option value="">CHOOSE TIME:</option>
              {times.map(item => (
                <option key={item.id} value={item.time}>{item.time}</option>
              ))}
            </select>

    

  



        
{/* 
            <select value={selectedPickCrockery} onChange={handleCrockery2} className="border border-gray-300 text-gray-500 px-2 py-1">
              <option value="">SELECT CROCKERY:</option>
              {pickcrockery.map(item => (
                <option key={item.id} value={item.crockery}>{item.crockery}</option>
              ))}
            </select> */}

          </div>
          {/* <input value={price} onChange={(e) => setPrice(e.target.value)} className='w-full border py-2 px-2 mt-2' placeholder='amount' />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border py-2 px-2 mt-2' placeholder='email' /> */}


          <div className='flex justify-center'>
            {isAuthenticated ? <PaystackButton {...paymentProps} className="bg-[#ffb640] text-white py-1 mt-9 px-24 rounded">{isLoading ? "Loading..." : "Login to Book"}</PaystackButton> : (<button onClick={()=> navigate('/login')} className="bg-[#ffb640] text-white py-1 mt-9 px-24 rounded">{isLoading ? "Loading..." : "Book"}</button> )}
            {/* <button  onClick={handleBooking} className="bg-[#ffb640] text-white py-1 mt-9 px-24 rounded">{isLoading ? "Loading..." : "Book"}</button> */}

          </div>
          <div>{error && <h3 className="text-red-500 text-md mt-2 text-center">Something went wrong</h3>}</div>

        </div>

  )
}

export default MakeBooking