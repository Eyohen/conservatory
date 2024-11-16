import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { URL, IF } from '../url'
import { SlPencil } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import Sidebar from '../components/Sidebar';



const  AdminTable = () => {
  const navigate=useNavigate()
    const [showConfirmation, setShowConfirmation] = useState("");
    const [items, setItems] = useState([]);


    const fetchBookings = async () => {

      // const accessToken = localStorage.getItem("access_token");

      // if (!accessToken) {
      //   // Handle the case where the access token is not available
      //   console.error("Access token not fund");
      // }

        const res = await axios.get(URL+"/api/users",
        // {
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

    const admin = items?.filter(a => a.role === "admin")





    const handleDelete=async(itemId)=>{
      try{
        // const accessToken = localStorage.getItem("access_token");

        // if(!accessToken){
        //       // Handle the case where the access token is not available
        //   console.error('Access token not found')
        // }
        const res = await axios.delete(URL+"/api/users/"+itemId
        // ,{
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
      )
        setItems((prevData) => prevData.filter(item => item.id !== itemId));
        console.log(res.data)
      }
      catch(err){
        console.log(err)
      }
    }



  return (
    <div>
      <Sidebar/>
    <div className='w-full flex-1 ml-[100px]'>
        <div className='flex justify-between h-12 bg-white mt-6'>

        </div>



        <div className='max-w-[1100px] bg-white mx-auto'>
        <Link to={'/createteammember'}><div className='flex justify-end'><button className='bg-[#F08E1F] px-6 py-2 text-white rounded-md'>Create Team Member</button></div></Link>


        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">

           
     

      <h1 className="font-bold text-2xl mt-10 text-center text-[#F08E1F]">
       Admin Team
      </h1>

      <div class="max-h-60 overflow-y-auto">

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
        <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
          <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              id
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              First Name
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              Last Name
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              date registered
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              view
            </th>
     
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              delete
            </th>

 
          </tr>
        </thead>
        <tbody>
      
            {admin.map((item) => (
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                key={item._id}
                //  onClick={()=>navigate(`/reservedetail/${item._id}`)}
              >
                 <td class="px-6 py-2">{item.id?.slice(0,6)}</td>
     
                 <td class="px-6 py-2">{item.firstName}</td>
                 <td class="px-6 py-2">{item.lastName}</td>
               <td class="px-6 py-2">{new Date(item.createdAt)?.toDateString()}</td>
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
    </div>
  )
}

export default AdminTable