import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import tearoom from '../assets/tearoom.jpg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from '../components/Modal';
import {ImCross} from 'react-icons/im'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { URL } from '../url';
import AsyncSelect from 'react-select/async'
import { IoChevronDown } from "react-icons/io5";

import axios from "axios"
import { Link, useNavigate, useParams , useLocation} from "react-router-dom"

const animatedComponents = makeAnimated()



const times = [
    {
        _id: 1,
        time: "11:30am - 1:30pm",
        },
        {
            _id: 2,
            time: "2pm - 4pm",
        },
        {
            _id: 3,
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


      

const Home = () => {
    const { search } = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState([])
    const [menu, setMenu] = useState([])
    const [selectedMenu,setSelectedMenu] = useState([]) 
    const [pickmenu, setPickMenu] = useState([])
    const [selectedPickMenu,setSelectedPickMenu] = useState([]) 
    const [time,setTime] = useState("")  
    const [error,setError]=useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [date, setDate] = useState(new Date())
    const [test, setTest] = useState('')
    const navigate = useNavigate()
   
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
    today = mm + '-' + dd + '-' + yyyy;
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
          const res = await axios.get(URL + "/api/menus/" + search);
          setPickMenu(res.data);
          console.log(res.data)
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        fetchMenu();
        fetchPickMenu();
      }, [search]);


//       const handleItemSearch = () => {
//   // Assuming the location is part of the selectedSubMarket state or needs to be determined here
//   // Find the selected market to get its location
//   const selectedM = menu.find((m) => m._id === id);

//   if (selectedM) {
//     navigate(`/menudetail/${id}`);
//   } else {
//     console.log("menu not found");
//     // Handle cases where the market's location isn't found
//   }
// };

// const handleOptionClick = (id) => {
//     // redirect to the corresponding page based on the option id
//     navigate(`/menudetail/${id}`);
// }


const handleMenu = (event) => {
  // setSelectedMenu(e.target.value);
  const selectedMenuItem = menu.find(men => men.menu === event.target.value);
  if (selectedMenuItem) {
    setSelectedMenu(event.target.value);
    navigate(`/menudetail/${selectedMenuItem._id}`);
  } else {
    console.log("Menu not found");
    // Handle cases where the menu item isn't found
  }
};
      

      const handleBooking = async ()=>{
        setIsLoading(true)
        try{
          const accessToken = localStorage.getItem("access_token");

          if(!accessToken){
                // Handle the case where the access token is not available
            console.error('Access token not found')
          }
          const res = await axios.post(URL+"/api/bookings/create",{time:selectedTime,menu:selectedPickMenu,date:startDate }, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          setSelectedTime(res.data.time)
          setDate(res.data.date)    
          setError(false)
          navigate("/")      
        }
        catch(err){
          setError(true)
          console.log(err)
        }finally {
          setIsLoading(false)
        }
    
      }
    



  return (
    <div>
        <Navbar/>
        <div className='flex justify-center gap-x-11 mt-24'>
            <div className='max-w-[500px]'>
            <p className='text-center text-[#ffb640] text-lg '>BOOK A TABLE</p>
            <p className='mt-4 text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <button onClick={openModal} className='bg-[#ffb640] text-white px-2 py-1 cursor-pointer mt-4'>CHECK AVAILABILITY</button>


            <Modal isOpen={isModalOpen} onClose={closeModal} title="Baby" />
            
                <div className='grid grid-cols-2 gap-x-6 mt-4'>
            <select value={selectedTime} onChange={handleTime} className="border border-gray-300 text-gray-500 px-2 py-1">
            <option value="">CHOOSE TIME:</option>
            {times.map(item => (
              <option key={item._id} value={item.time}>{item.time}</option>
            ) )}
          </select>

          <DatePicker selected={startDate}
           onChange={(date) => setStartDate(date)} 
          //  minDate={new Date("04-13-2024")}
          minDate={today}
         
           className='border border-gray-300 text-gray-500 py-1 '  />
          </div>


          <div className='grid grid-cols-2 gap-x-6 mt-4'>
                  <select value={selectedMenu} onChange={(e) => handleMenu(e)} className="border border-gray-300 text-gray-500 px-2 py-1 ">
            <option value="">DISCOVER MENU:</option>
           {menu.map(item => (
              <option key={item._id} onClick={() => handleMenu(item._id)} value={item.menu}>{item.menu}</option>
            ))}   
          </select>

          <select value={selectedPickMenu} onChange={handleMenu2} className="border border-gray-300 text-gray-500 px-2 py-1">
            <option value="">SELECT MENU:</option>
            {pickmenu.map(item => (
              <option key={item._id} value={item.menu}>{item.menu}</option>
            ) )}
          </select>

          </div> 
          <div className='flex justify-center'>
          <button onClick={handleBooking} className="bg-[#ffb640] text-white py-1 mt-9 px-24 rounded">{isLoading ? "Loading..." : "Book"}</button>

</div>
<div>{error && <h3 className="text-red-500 text-md mt-2 text-center">Something went wrong</h3>}</div>

            </div>

            <div><img src={tearoom} alt='' className='object-cover shadow-lg w-[550px] h-[350px] shadow-gray-600'/></div>
            
        </div>

        <p className='font-semibold text-center mt-24'>SPEAK TO SOMEONE IN PERSON</p>
        <p className='text-center text-gray-400'>If you would like to make a larger booking or have any questions, please get in touch.</p>
        <div className='flex justify-center gap-x-16 mt-12'>
            <div className='max-w-[200px]'>
                <p className='text-center'>CONTACT US</p>
                <p className='text-gray-400'>Please call the team on</p>
                <p className='font-bold text-center'>09062056518</p>

            </div>

                    <div className='border-r border-r-gray-700'></div>

            <div className='max-w-[200px]'>
                <p className='text-center'>FIND US</p>
                <p className='text-gray-400'>Please call the team on</p>
                <p className='font-bold text-center'>09062056518</p>
            </div>
            <div className='border-r border-r-gray-700'></div>

<div className='max-w-[200px]'>
    <p className='text-center'>FOR SPECIAL REQUEST</p>
   <Link to={'/special'}><p className='text-green-500'>click here</p></Link> 
   
</div>
        </div>
  
        </div>
  )
}

export default Home