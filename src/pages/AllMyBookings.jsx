import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { URL, IF } from '../url'
import { SlPencil } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { HiOutlineArchiveBox } from "react-icons/hi2";



const  AllMyBookings = () => {
  const navigate=useNavigate()
    const [showConfirmation, setShowConfirmation] = useState("")
    const [items, setItems] = useState([])

    const fetchApartments = async () => {

    //   const accessToken = localStorage.getItem("access_token");

    //   if(!accessToken){
    //         // Handle the case where the access token is not available
    //     console.error('Access token not fund')
    //   }


        const res = await axios.get(URL+"/api/bookings"
        //,{
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
        )
        setItems(res.data)
        console.log(res.data)
    }


    useEffect(() => {
      fetchApartments()
    }, [])


    const handleSearch = () => {

    }

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
        setItems((prevData) => prevData.filter(item => item.id !== itemId));
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

       <Link to={'/seespecial'}><div  className="flex items-center space-x-3 pt-6 px-12">
    
        <h1 className='font-bold md:text-2xl text-xl text-[#F08E1F]'>See Special requests</h1>
        </div></Link> 
        </div>

        {/* <div onClick={() => navigate(-1)} className="flex items-center space-x-3 pt-6 px-12">
        <SlArrowLeft />
        <h1 className='font-bold md:text-2xl text-xl '>Back</h1>
        </div>

        <div onClick={() => navigate(-1)} className="flex items-center space-x-3 pt-6 px-12">
        <SlArrowLeft />
        <h1 className='font-bold md:text-2xl text-xl '>Back</h1>
        </div>
       */}

        <div className='max-w-[1100px] bg-white mx-auto'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
      {/* <div className="flex justify-between">
        <Link to={"/home"}>
          <button className="bg-[#2C5C4B] p-2 text-white rounded-lg">
            All Participants
          </button>
        </Link>

        <div>
          <input
            type="text"
            placeholder="Search name"
            className=" h-10 border border-gray-500"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-[#2C5C4B] p-2 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div> */}

      <h1 className="font-bold text-2xl mt-10 text-center text-[#F08E1F]">
       Bookings and reservations
      </h1>

      <div class="max-h-60 overflow-y-auto">
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
            {/* <th scope="col" class="px-6 py-3 font-light ">
              status
            </th>
          
            <th scope="col" class="px-6 py-3 font-light">
              check
            </th> */}
          </tr>
        </thead>
        <tbody>
      
            {items.map((item) => (
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                key={item.id}
                //  onClick={()=>navigate(`/reservedetail/${item._id}`)}
              >
                 <td class="px-6 py-2">{item.id.slice(0,6)}</td>
                {/* <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  
                  <img
                    className="w-11 h-11"
                    src={user?.BetTribeLog?.profileImage}
                    alt=""
                  />
                </th> */}
               <td class="px-6 py-2">{new Date(item.date)?.toDateString()}</td>
                <td class="px-6 py-2">{item.time}</td>
                <td class="px-6 py-2">{item.menu.slice(0,9)}</td>
                <td class="px-6 py-2">{item.crockery}</td>
               
                {/* <td class="px-6 py-2">{user.date}</td>
                <td class="px-6 py-2">{user.time}</td>
                <td class="px-6 py-2">
                   {user.type}
                    </td> */}
                {/* <td class="px-6 py-4">
                {item.status == "New pre-leasing" ?  ( <p className='bg-green-400 text-center rounded-3xl text-white'>{item.status}</p>) : ( <p className='bg-red-400  rounded-full text-center text-white'>{item.status}</p>)}
                </td> */}
             
                {/* <td class="px-6 py-2">{item.date}</td> */}
               
                <Link to={`/bookingitem/${item.id}`}><td class="px-6 py-2"><HiOutlineArchiveBox className='mt-3'/></td></Link>
                <td class="px-6 py-2" onClick={() => handleDelete(item.id)}><SlTrash className='text-red-800'/></td>
               
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

export default AllMyBookings