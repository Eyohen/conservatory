import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { URL, IF } from '../url'
import { SlPencil } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdEdit } from "react-icons/md";
import Sidebar from '../components/Sidebar';



const MenuTable = () => {
  const navigate=useNavigate()
    const [showConfirmation, setShowConfirmation] = useState("")
    const [items, setItems] = useState([])

    const fetchMenus = async () => {

    //   const accessToken = localStorage.getItem("access_token");

    //   if(!accessToken){
    //         // Handle the case where the access token is not available
    //     console.error('Access token not fund')
    //   }


        const res = await axios.get(URL+"/api/menus"
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
      fetchMenus()
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
  
  
        const res = await axios.delete(URL+"/api/menus/"+itemId,{
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
    <div>
      <Sidebar/>
    <div className='w-full flex-1 ml-[100px]'>
        <div className='flex justify-between  h-12 bg-white mt-6'>
        <div onClick={() => navigate(-1)} className="flex items-center space-x-3 pt-6 px-12">
        <SlArrowLeft />
        <h1 className='font-bold md:text-2xl text-xl '>Back</h1>
        </div>

    
        </div>


        <div className='max-w-[1100px] bg-white mx-auto'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
      <h1 className="font-bold text-2xl mt-10 text-center text-[#F08E1F]">
        Menus Created
      </h1>

      <div class="max-h-60 overflow-y-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
          <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              id
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              Menu
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              edit
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              delete
            </th>
            <th scope="col" class="px-6 py-3 font-light text-[#F08E1F]">
              view
            </th>
          </tr>
        </thead>
        <tbody>
      
            {items.map((item) => (
            
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                key={item.id}
                //  onClick={()=>navigate(`/menudetail/${item._id}`)}
              >
                 <td class="px-6 py-2">{item.id.slice(0,6)}</td>
                <td class="px-6 py-2">{item.title.slice(0,7)}...</td>
               
                <Link to={`/editmenu/${item.id}`}><td class="px-6 py-2"><MdEdit className='mt-3'/></td></Link>
                <td class="px-6 py-2" onClick={() => handleDelete(item.id)}><SlTrash className='text-red-800'/></td>
                <Link to={`/menudetail/${item.id}`}><td class="px-6 py-2"><HiOutlineArchiveBox className=''/></td></Link>
               
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

export default MenuTable