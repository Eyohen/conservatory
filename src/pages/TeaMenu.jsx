import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import tearoom from '../assets/tearoom.jpg'
import axios from 'axios'
import { URL } from '../url'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import makeAnimated from 'react-select/animated'
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
import { PaystackButton } from 'react-paystack';
import { useAuth } from '../context/AuthContext'
import { IoIosArrowDown } from "react-icons/io";
import { addDays } from 'date-fns'
import Modal from './Modal'

const TeaMenu = () => {
  const [showTea, setShowTea] = useState(true)
  const [showCrockery, setShowCrockery] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [time, setTime] = useState('');
  const [menus, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [crockery, setCrockery] = useState([]);
  const [selectedCrockery, setSelectedCrockery] = useState(null)
  const [selectedTea, setSelectedTea] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState('');
  const [selectedIceTea, setSelectedIceTea] = useState('');
  const [coffee, setCoffee] = useState([]);
  const [iceTea, setIceTea] = useState([]);
  const [exotic, setExotic] = useState([]);
  const [classic, setClassic] = useState([]);
  const [items3, setItem3] = useState([]);
  const [items4, setItem4] = useState([]);
  const [items5, setItem5] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [availability, setAvailability] = useState('')
  const [timeSlotAvailability, setTimeSlotAvailability] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateError, setDateError] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [selectedTeas, setSelectedTeas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // const handleTeaSelection = (e, teaType) => {
  //   const tea = e.target.value;
  //   if (tea) {
  //     setSelectedTeas(prev => [...prev, `${teaType} : ${tea}`]);
  //   }
  // }

  const handleTeaSelection = (e, teaType) => {
    const tea = e.target.value;
    if (!tea) return; // Skip empty selections
    
    setSelectedTeas(prev => {
      // Remove any existing selection for this tea type
      const withoutCurrentType = prev.filter(t => !t.startsWith(`${teaType} :`));
      
      // If we already have 2 selections and this is a new selection
      if (withoutCurrentType.length >= 2) {
        setErrorMessage('You can only select 2 teas in total. Please remove one first.');
        return prev;
      }
      
      setErrorMessage(''); // Clear error message on successful selection
      return [...withoutCurrentType, `${teaType} : ${tea}`];
    });
  };
  
  // Add this function to handle tea removal
  const removeTeaSelection = (teaType) => {
    setSelectedTeas(prev => prev.filter(tea => !tea.startsWith(`${teaType} :`)));
    setErrorMessage('');
  };
  

  const timeslots = ["11:30am - 1:30pm", "2pm - 4pm", "4:30pm - 6:30pm"];

  const handleShowTea = () => {
    setShowTea(true)
    setShowCrockery(false)
  }

  const handleShowCrockery = () => {
    setShowTea(false)
    setShowCrockery(true)
  }

  const checkAvailability = async (timeSlot) => {
    setDateError(''); //Clear any previous date error
    if (!startDate) {
      setDateError("Please select a date first");
      return;
    }

    setTime(timeSlot);
    setSelectedTime(timeSlot);
    setAvailability('');
    setError('');

    try {

      const res = await axios.post(`${URL}/api/bookings/check-availability`, {
        date: startDate?.toISOString(),
        time: timeSlot
        // date: "2024-08-08T23:00:00.000Z",
        // time: "11:30am  -  1:30pm"
      });

      console.log(`Checking availability for ${timeSlot}:`, res.data);

      if (res.status === 200) {
        const isAvailable = res.data.available;
        setAvailability(isAvailable ? `This time is Available` : `This time is Unavailable`);
        setTimeSlotAvailability(prev => ({
          ...prev,
          [timeSlot]: isAvailable
        }));
      }
    } catch (err) {
      const message = err.response?.data?.msg || 'Failed to check availability';
      setError(message);
    }
  }

  const checkAllTimeslots = async (date) => {
    if (!date) return; // Don't check if no date is selected

    setTimeSlotAvailability({}); // Reset availability
    setAvailability(''); // Reset individual slot availability message
    setError('');

    try {
      const promises = timeslots.map(timeSlot =>
        axios.post(`${URL}/api/booked-timeslots`, {
          date: date.toISOString().split('T')[0], // Ensure consistent date format
          time: timeSlot,
        })
      );

      const results = await Promise.all(promises);

      const newAvailability = results.reduce((acc, res, index) => {
        acc[timeslots[index]] = res.data.available;
        return acc;
      }, {});

      console.log("All timeslots availability:", newAvailability);
      setTimeSlotAvailability(newAvailability);
    } catch (err) {
      console.error('Failed to check all timeslots:', err);
      setError('Failed to check timeslot availability');
    }
  }

  useEffect(() => {
    console.log("timeSlotAvailability updated:", timeSlotAvailability);
  }, [timeSlotAvailability]);

  // console.log('timeSlot', timeSlot)

  const { user, logout } = useAuth();

  // const userId = user?.id;
  const userEmail = user?.email;


  console.log("Henry is just checking the user object", userEmail)

  const navigate = useNavigate()

  const { isAuthenticated } = useAuth();

  const publicKey = "pk_test_6fa7dbd015006b4b712c4d8bfedcd53cb4f93320"


  const numberFormatter = new Intl.NumberFormat('en-US');

  const handleTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleExotic = (e) => {
    setSelectedTea(e.target.value);
  };

  const handleClassic = (e) => {
    setSelectedTea(e.target.value);
  }

  const handleGreen = (e) => {
    setSelectedTea(e.target.value);
  };

  const handleSpecialty = (e) => {
    setSelectedTea(e.target.value);
  }

  const handleBlooming = (e) => {
    setSelectedTea(e.target.value);
  };

  const handleCoffee = (e) => {
    setSelectedCoffee(e.target.value);
  }

  const handleIceTea = (e) => {
    setSelectedIceTea(e.target.value);
  };


  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${URL}/api/menus/`);
      setMenu(res.data);
      if (res.data.length > 0) {
        setSelectedMenu(res.data[0]);
      }
      console.log('Menus:', res.data);
      console.log("", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchMenu();
  }, [])

  const fetchCrockery = async () => {
    try {
      const res = await axios.get(`${URL}/api/crockerys/`);
      setCrockery(res.data);
      console.log("crockery", crockery)
      if (res.data.length > 0) {
        setSelectedCrockery(res.data[5]);
      }
      console.log('Crockerys:', res.data);
      console.log("", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchCrockery();
  }, [])

  const fetchExoticTea = async () => {
    try {
      const res = await axios.get(`${URL}/api/exoticTeas/`);
      setExotic(res.data);
      console.log("exotic teas", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchExoticTea();
  }, [])

  const fetchClassicTea = async () => {
    try {
      const res = await axios.get(`${URL}/api/classicTeas/`);
      setClassic(res.data);
      console.log("exotic teas", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchClassicTea();
  }, [])

  const fetchBloomingTea = async () => {
    try {
      const res = await axios.get(`${URL}/api/bloomingTeas/`);
      setItem3(res.data);
      console.log("exotic teas", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchBloomingTea();
  }, [])

  const fetchGreenTea = async () => {
    try {
      const res = await axios.get(`${URL}/api/greenTeas/`);
      setItem4(res.data);
      console.log("exotic teas", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchGreenTea();
  }, [])

  const fetchSpecialtyTea = async () => {
    try {
      const res = await axios.get(`${URL}/api/specialtyTeas/`);
      setItem5(res.data);
      console.log("exotic teas", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchSpecialtyTea();
  }, [])

  const fetchCoffee = async () => {
    try {
      const res = await axios.get(`${URL}/api/coffees/`);
      setCoffee(res.data);
      console.log("coffee", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchCoffee();
  }, [])

  const fetchIceTea = async () => {
    try {
      const res = await axios.get(`${URL}/api/iceTeas/`);
      setIceTea(res.data);
      console.log("ice teas", res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchIceTea();
  }, [])

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleCrockeryClick = (c) => {
    setSelectedCrockery(c);
  };

  console.log("checking selected price in real time ", selectedMenu?.price)

  const money = selectedMenu?.price

  // const teaSelection = selectedExotic || selectedClassic;

  const handleBooking = async () => {
    setIsLoading(true)
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        // Handle the case where the access token is not available
        console.error('Access token not found')
      }

      // Use SelectedTime if it's set , otherwise use time
      const bookingTime = selectedTime || time;

      if (!bookingTime) {
        setError("Please select a time slot");
        setIsLoading(false);
        return;
      }

      //Adjust the date by adding one day
      // const adjustedDate = addDays(startDate, 1);

      const res = await axios.post(URL + "/api/bookings/create", {
        time: bookingTime, menu: selectedMenu.title,
        crockery: selectedCrockery.crockery,
        date: startDate,
        // date: adjustedDate,
        price: money,
        email: userEmail,
        // tea:selectedTea,
        tea: selectedTeas,
        coffee: selectedCoffee, iceTea: selectedIceTea,
        userId: user?.id
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      console.log("Henry booking", res.data)
      const bookingId = res.data.record.id
      const amount = res.data.record.price
      navigate(`/bookingconfirmation/${bookingId}`)
      if (bookingId && amount) {

        const response = await axios.post(URL + "/api/payments/create", { amount, bookingId }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        console.log("checking payment", response.data)
      }

      console.log("we are looking", bookingId)
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
    email: userEmail,
    time: typeof selectedTime === 'string' ? selectedTime : time,
    menu: selectedMenu,
    crockery: selectedCrockery,
    coffee: selectedCoffee,
    iceTea: selectedIceTea,
    amount: money * 100,
    tea: selectedTea,
    userId: user?.id,
    publicKey,
    text: "Make Booking",
    onClose: () => alert("Are you sure you want to close"),
    onSuccess: ({ reference }) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
      handleBooking();
      navigate(`/bookingconfirmation/${bookingId}`)
    },
  }

  // Function to add days to a date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Function to check if a date is Sunday
  const isSunday = (date) => {
    return date.getDay() === 0;
  };

  // Function to get the minimum selectable date (2 days from today)
  const getMinDate = () => {
    return addDays(new Date(), 2);
  };

  // Function to filter out first two days and Sundays
  const filterDates = (date) => {
    const today = new Date();
    const twoDaysFromNow = addDays(today, 2);

    // Allow the date if it's after twoDaysFromNow and not a Sunday
    return date > twoDaysFromNow && !isSunday(date);
  };

  // const canBook = selectedTeas.length + (selectedCoffee ? 1 : 0) + (selectedIceTea ? 1 : 0) >= 2;

  // Update the canBook validation
const canBook = selectedTeas.length === 2 || 
((selectedTeas.length + (selectedCoffee ? 1 : 0) + (selectedIceTea ? 1 : 0)) >= 2);


  return (
    <div className="bg-[#F6EADF] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className='text-2xl md:text-3xl text-[#5b3e31] text-center pt-2 mb-6'>Menu</h1>

        <Modal isOpen={isModalOpen} onClose={closeModal} />

        <div className='flex justify-center mt-6'>
          <DatePicker 
            selected={startDate}
            onChange={(date) => {
              setStartDate(date)
              if(date){
                checkAllTimeslots(date);
              }
            }}
            filterDate={filterDates}
            excludeDays={[0]}
            dateFormat="dd/MM/yyyy"
            className='border border-gray-400 rounded-md bg-[#F6EADF] text-gray-800 px-2 py-2 w-[350px]' 
            placeholderText='Enter Date' 
          />             
        </div>

        {dateError && (
  <div className="text-red-500 text-center mb-4">
    {dateError}
  </div>
)}

        <div className='flex flex-col gap-y-4 max-w-[200px] mx-auto mt-5'>
          {timeslots.map((timeSlot) => (
            <button
              key={timeSlot}
              className={`text-white py-2 px-4 rounded ${
                timeSlotAvailability[timeSlot] === false
                  ? 'bg-gray-300 cursor-not-allowed'
                  : selectedTime === timeSlot
                  ? 'bg-[#5b3e31] ring-2 ring-[#ffb640]' 
                  : 'bg-[#5b3e31]'
              }`} 
              onClick={() => timeSlotAvailability[timeSlot] !== false && checkAvailability(timeSlot)}
              disabled={timeSlotAvailability[timeSlot] === false}
            >
              {timeSlot}
            </button>
          ))}
        </div>

        <div className='text-center mt-4'>
          {availability && (
            <p className={`${availability === `This time is Available` ? 'text-green-600' : 'text-red-600'} mb-2`}>
              {availability}
            </p>
          )}
          {selectedTime && (
            <p className='bg-white text-sm border border-black px-2 py-1 rounded-md inline-block'>
              You have selected {selectedTime}
            </p>
          )}
        </div>

        <div className='flex justify-center mt-8 gap-x-4'>
          <button onClick={handleShowTea} className='bg-[#5b3e31] px-4 py-2 rounded-md text-white text-base md:text-lg'>Tea Menu</button>
          <button onClick={handleShowCrockery} className='bg-[#5b3e31] px-4 py-2 rounded-md text-white text-base md:text-lg'>Crockery</button>
        </div>

        {showCrockery && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8'>
            {crockery.map((c) => (
              <button key={c.id}
                className='border border-[#5b3e31] text-[#5b3e31] hover:text-[#ffb640] text-base md:text-xl px-2 py-2 rounded-md cursor-pointer'
                onClick={() => handleCrockeryClick(c)}
              >{c.crockery}</button>
            ))}
          </div>
        )}

        {showCrockery && <p className='text-center text-lg md:text-xl mt-6'>Please select from our variety of Crockeries</p>}

        {showCrockery && selectedCrockery && (
          <div className="mt-6">
            <h2 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center'>{selectedCrockery.crockery}</h2>
            <div className='flex justify-center mt-4'>
              <img src={selectedCrockery?.image || tearoom} className='object-scale-down w-full max-w-[550px] h-auto' alt={selectedCrockery.crockery} />
            </div>
            <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-4'>{selectedCrockery.description}</p>
          </div>
        )}

        {showTea && (
          <div className='flex flex-wrap justify-center gap-4 mt-6'>
            {menus.map((menu) => (
              <button key={menu.id}
                className='border border-[#5b3e31] text-[#5b3e31] hover:text-[#ffb640] text-base md:text-xl px-3 py-1 rounded-md cursor-pointer'
                onClick={() => handleMenuClick(menu)}
              >{menu.title}</button>
            ))}
          </div>
        )}

        {showTea && <p className='text-center text-lg md:text-xl mt-6'>Please select from our variety of tea</p>}

        {showTea && selectedMenu && (
          <div className="mt-6">
            <h2 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center'>{selectedMenu.title}</h2>
            <div className='flex justify-center mt-4'>
              <img src={selectedMenu.imageUrl || tearoom} className='object-scale-down w-full max-w-[550px] h-auto' alt={selectedMenu.title} />
            </div>
            <p className='text-xl font-semibold text-center mt-4'>₦{numberFormatter.format(selectedMenu.price)}</p>
            <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-2'>{selectedMenu.description}</p>

            <h3 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center mt-6'>Savoury</h3>
            <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-2'>{selectedMenu.savoury}</p>

            <h3 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center mt-6'>Semi-Sweet</h3>
            <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-2'>{selectedMenu.semiSweet}</p>

            <h3 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center mt-6'>Dessert</h3>
            <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-2'>{selectedMenu.dessert}</p>
          </div>
        )}

        <h2 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center mt-8'>Beverages</h2>
        <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-2'>Please select a minimum of two beverages</p>

        <h3 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center mt-6'>Tea Selection</h3>

        <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-2'>
    Selected: {selectedTeas.length}/2 teas required
  </p>

  {errorMessage && (
    <p className="text-red-500 text-center mt-2">
      {errorMessage}
    </p>
  )}

  <div className="space-y-4 mt-4">
    {/* Classic Teas */}
    <div className="relative">
      <select 
        value={selectedTeas.find(tea => tea.startsWith('Classic :'))?.split(': ')[1] || ''}
        onChange={(e) => handleTeaSelection(e, 'Classic')}
        className="w-full max-w-[500px] mx-auto block border border-gray-300 bg-[#F6EADF] text-gray-500 px-4 py-2 rounded"
      >
        <option value="">CLASSIC TEAS</option>
        {classic.map(item => (
          <option key={item.id} value={item.classicTea}>
            {item.classicTea}
          </option>
        ))}
      </select>
      {selectedTeas.find(tea => tea.startsWith('Classic :')) && (
        <button
          onClick={() => removeTeaSelection('Classic')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-xl"
          style={{ marginRight: 'calc(50% - 240px)' }}
        >
          ×
        </button>
      )}
    </div>

    {/* Green Teas */}
    <div className="relative">
      <select 
        value={selectedTeas.find(tea => tea.startsWith('Green :'))?.split(': ')[1] || ''}
        onChange={(e) => handleTeaSelection(e, 'Green')}
        className="w-full max-w-[500px] mx-auto block border border-gray-300 bg-[#F6EADF] text-gray-500 px-4 py-2 rounded"
      >
        <option value="">GREEN TEAS</option>
        {items4.map(item => (
          <option key={item.id} value={item.greenTea}>
            {item.greenTea}
          </option>
        ))}
      </select>
      {selectedTeas.find(tea => tea.startsWith('Green :')) && (
        <button
          onClick={() => removeTeaSelection('Green')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-xl"
          style={{ marginRight: 'calc(50% - 240px)' }}
        >
          ×
        </button>
      )}
    </div>

    {/* Specialty Teas */}
    <div className="relative">
      <select 
        value={selectedTeas.find(tea => tea.startsWith('Specialty :'))?.split(': ')[1] || ''}
        onChange={(e) => handleTeaSelection(e, 'Specialty')}
        className="w-full max-w-[500px] mx-auto block border border-gray-300 bg-[#F6EADF] text-gray-500 px-4 py-2 rounded"
      >
        <option value="">SPECIALTY TEAS</option>
        {items5.map(item => (
          <option key={item.id} value={item.specialtyTea}>
            {item.specialtyTea}
          </option>
        ))}
      </select>
      {selectedTeas.find(tea => tea.startsWith('Specialty :')) && (
        <button
          onClick={() => removeTeaSelection('Specialty')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-xl"
          style={{ marginRight: 'calc(50% - 240px)' }}
        >
          ×
        </button>
      )}
    </div>

    {/* Exotic Teas */}
    <div className="relative">
      <select 
        value={selectedTeas.find(tea => tea.startsWith('Exotic :'))?.split(': ')[1] || ''}
        onChange={(e) => handleTeaSelection(e, 'Exotic')}
        className="w-full max-w-[500px] mx-auto block border border-gray-300 bg-[#F6EADF] text-gray-500 px-4 py-2 rounded"
      >
        <option value="">EXOTIC TEAS</option>
        {exotic.map(item => (
          <option key={item.id} value={item.exoticTea}>
            {item.exoticTea}
          </option>
        ))}
      </select>
      {selectedTeas.find(tea => tea.startsWith('Exotic :')) && (
        <button
          onClick={() => removeTeaSelection('Exotic')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-xl"
          style={{ marginRight: 'calc(50% - 240px)' }}
        >
          ×
        </button>
      )}
    </div>

    {/* Blooming Teas */}
    <div className="relative">
      <select 
        value={selectedTeas.find(tea => tea.startsWith('Blooming :'))?.split(': ')[1] || ''}
        onChange={(e) => handleTeaSelection(e, 'Blooming')}
        className="w-full max-w-[500px] mx-auto block border border-gray-300 bg-[#F6EADF] text-gray-500 px-4 py-2 rounded"
      >
        <option value="">BLOOMING TEAS</option>
        {items3.map(item => (
          <option key={item.id} value={item.bloomingTea}>
            {item.bloomingTea}
          </option>
        ))}
      </select>
      {selectedTeas.find(tea => tea.startsWith('Blooming :')) && (
        <button
          onClick={() => removeTeaSelection('Blooming')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-xl"
          style={{ marginRight: 'calc(50% - 240px)' }}
        >
          ×
        </button>
      )}
    </div>
  </div>

        {/* {['Classic', 'Green', 'Specialty', 'Exotic', 'Blooming'].map((teaType) =>
        {
          // Find the current selection for this tea type from selectedTeas array
          const currentSelection = selectedTeas.find(tea => tea.startsWith(`${teaType} :`))?.split(': ')[1];
          
          return (
            <div className='mb-4' key={teaType}>
              <select 
                value={currentSelection || ''} // Use the found selection or empty string
                onChange={(e) => handleTeaSelection(e, teaType)}
                className="w-full max-w-[500px] mx-auto block border border-gray-300 bg-[#F6EADF] text-gray-500 px-4 py-2 rounded"
              >
                <option value="">
                  {teaType.toUpperCase()} TEAS {currentSelection ? `(Selected: ${currentSelection})` : ''}
                </option>
                {(teaType === 'Classic' ? classic :
                  teaType === 'Green' ? items4 :
                  teaType === 'Specialty' ? items5 :
                  teaType === 'Exotic' ? exotic :
                  items3).map(item => (
                  <option 
                    key={item.id} 
                    value={item[`${teaType.toLowerCase()}Tea`]}
                  >
                    {item[`${teaType.toLowerCase()}Tea`]}
                  </option>
                ))}
              </select>
            </div>
          );
        })} */}

        <h3 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center mt-8'>Coffee Selection</h3>
        <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-2'>(additional ₦7,500)</p>

        <div className='flex justify-center mt-4'>
          <select value={selectedCoffee} onChange={handleCoffee} className="border border-gray-300 bg-[#F6EADF] w-full max-w-[500px] text-gray-500 px-2 py-2 rounded">
            <option value="">COFFEES:</option>
            {coffee.map(item => (
              <option key={item.id} value={item.coffee}>{item.coffee}</option>
            ))}
          </select>
        </div>

        <h3 className='text-xl md:text-2xl text-[#5b3e31] font-semibold text-center mt-8'>Ice Tea Selection</h3>
        <p className='text-lg md:text-xl text-[#5b3e31] text-center mt-2'>(additional ₦7,500)</p>

        <div className='flex justify-center mt-4'>
          <select value={selectedIceTea} onChange={handleIceTea} className="border border-gray-300 bg-[#F6EADF] w-full max-w-[500px] text-gray-500 px-2 py-2 rounded">
            <option value="">ICE TEAS:</option>
            {iceTea.map(item => (
              <option key={item.id} value={item.iceTea}>{item.iceTea}</option>
            ))}
          </select>
        </div>

        <div className='flex justify-center py-8'>
          {isAuthenticated ? (
            <PaystackButton {...paymentProps} disabled={!canBook} className="bg-[#5b3e31] text-white py-2 px-8 rounded text-base md:text-lg">
              {canBook ? "Make Booking" : "Select at least 2 beverages"}
            </PaystackButton>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-[#ffb640] text-white py-2 px-8 rounded text-base md:text-lg">
              {isLoading ? "Loading..." : "Login to Book"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeaMenu;

