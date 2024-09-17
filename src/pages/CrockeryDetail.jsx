import { SlArrowLeft } from "react-icons/sl";
import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import axios from "axios"
import { URL, IF } from '../url';
import { useNavigate, useParams, Link } from 'react-router-dom';
import tearoom  from '../assets/tearoom.jpg'


const CrockeryDetail = () => {
    const {id: crockeryId} = useParams()
    const [items, setItems] = useState([])
    const navigate=useNavigate()

    const getCrockery = async () => {
        try {  
          const res =  await axios.get(URL+"/api/crockerys/"+crockeryId)
          console.log("crockery ooo",res.data)
          setItems(res.data)
        //   console.log(reservation)
        }
        catch(err){
          console.log(err)
        }
    
    } 
    

     useEffect(() => {
        getCrockery()
     },[crockeryId])
  return (
    <div>
          <div className='flex flex-col justify-center items-center mt-12 gap-y-6'>
     
          <div onClick={() => navigate(-1)} className="flex items-center space-x-3 px-12 mt-9">
        <SlArrowLeft color='#ffb640' />
        <h1 className='text-md font-md cursor-pointer text-[#ffb640]'>go back</h1>
        </div> 
        <p className='text-center mt-9'>Crockery Detail</p>

      <p>{items?.crockery}</p>
    <img src={items?.image ? items?.image : tearoom} alt='' className='object-cover w-[450px] h-[250px]'/>
   {/* <div className='max-w-[450px] break-words'>
<p className='items-center'>Description : {items?.description}</p>
</div> */}

   
  
    </div>
    </div>
  )
}

export default CrockeryDetail