import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { URL, IF } from '../url'
import { SlPencil } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { HiOutlineArchiveBox } from "react-icons/hi2";



const  Dashboard = () => {
  const navigate=useNavigate()
    const [showConfirmation, setShowConfirmation] = useState("");
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    const fetchBookings = async () => {

        const res = await axios.get(URL+"/api/bookings"
        //,{
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
        )
        // setItems(res.data);
        setItems(res.data);
        console.log(res.data);
    }

    useEffect(() => {
      fetchBookings()
    }, [])


    const descendingEvent = () => {
      let data = [...items]
      if(data.length > 0){
        let result = data.sort((a,b) => b.menu.localeCompare(a.menu))
        setItems(result)
      }
    }

  // Function to handle sorting
  const handleSort = () => {
    // Toggle between ascending and descending order
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    // Sort the data based on the sortOrder
    const sortedData = [...items].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.menu - b.menu; // Change columnName to your actual sorting column
      } else {
        return b.menu - a.menu;
      }
    });

    // Update the state with sorted data
    setItems(sortedData);
  };


    const handleDelete=async(itemId)=>{
      try{
        const accessToken = localStorage.getItem("access_token");

        if(!accessToken){
              // Handle the case where the access token is not available
          console.error('Access token not found')
        }
        const res = await axios.delete(URL+"/api/bookings/"+itemId,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setItems((prevData) => prevData.filter(item => item._id !== itemId));
        console.log(res.data)
      }
      catch(err){
        console.log(err)
      }
    }



  return (
    <div className='w-full'>
        <div className='flex justify-between  h-12 bg-white mt-6'>
        <div onClick={() => navigate(-1)} className="flex items-center space-x-3 pt-6 px-12">
        <SlArrowLeft />
        <h1 className='font-bold md:text-2xl text-xl '>Back</h1>
        </div>

       <Link to={'/seespecial'}><div className="flex items-center space-x-3 pt-6 px-12">
    
        <h1 className='font-bold md:text-2xl text-xl text-[#F08E1F]'>See Special requests</h1>
        </div></Link> 
        
       <Link to={'/menupage'}><div className="flex items-center space-x-3 pt-6 px-12">
    
    <h1 className='font-bold md:text-2xl text-xl text-[#F08E1F]'>Create menu</h1>
    </div></Link> 
        </div>

        <div className='max-w-[1100px] bg-white mx-auto'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
     

      <h1 className="font-bold text-2xl mt-10 text-center text-[#F08E1F]">
       Bookings and reservations
      </h1>

      <div class="max-h-60 overflow-y-auto">
      <button className='border border-[#F08E1F] px-6 py-1 rounded' onClick={descendingEvent}>Latest Booking</button>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
          <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              id
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              date
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              time
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              Menu
            </th>
       
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              Crockery
            </th>
          
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              edit
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              delete
            </th>
 
          </tr>
        </thead>
        <tbody>
      
            {items.map((item) => (
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                key={item._id}
                //  onClick={()=>navigate(`/reservedetail/${item._id}`)}
              >
                 <td class="px-6 py-2">{item._id.slice(0,6)}</td>
     
               <td class="px-6 py-2">{new Date(item.date)?.toDateString()}</td>
                <td class="px-6 py-2">{item.time}</td>
                <td class="px-6 py-2">{item.menu.slice(0,9)}</td>
                <td class="px-6 py-2">{item.crockery}</td>

                <Link to={`/bookingitem/${item._id}`}><td class="px-6 py-2"><HiOutlineArchiveBox className='mt-3'/></td></Link>
                <td class="px-6 py-2" onClick={() => handleDelete(item._id)}><SlTrash className='text-red-800'/></td>
               
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
        </div>
       
      
       
        
        
    </div>
  )
}

export default Dashboard