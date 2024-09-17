import { SlArrowLeft } from "react-icons/sl";
import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import axios from "axios"
import { URL, IF } from '../url';
import { useNavigate, useParams, Link } from 'react-router-dom';


const MenuDetail = () => {
    const {id: menuId} = useParams()
    const [items, setItems] = useState([])
    const navigate=useNavigate()

    const getMenu = async () => {
        try {  
          const res =  await axios.get(URL+"/api/menus/"+menuId)
          console.log("checking menu detail",res.data)
          setItems(res.data)
        //   console.log(reservation)
        }
        catch(err){
          console.log(err)
        }
    
    } 
    

     useEffect(() => {
        getMenu()
     },[menuId])
  return (
    <div>
          <div className='flex flex-col justify-center items-center mt-12 gap-y-6'>
     
          <div onClick={() => navigate(-1)} className="flex items-center space-x-3 px-12 mt-9">
        <SlArrowLeft color='#ffb640' />
        <h1 className='text-md font-md cursor-pointer text-[#ffb640]'>go back</h1>
        </div> 
        <p className='text-center mt-9'>Menu detail</p>

      <p className="font-semibold text-xl">{items?.title}</p>

      <p className="font-semibold text-xl">₦{items?.price}</p>
    {/* <img src={IF+items?.imageUrl ? IF+items?.imageUrl : 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M='} alt='' className='object-cover w-[450px] h-[250px]'/> */}
    <img src={items?.imageUrl} className='object-cover w-[450px] h-[250px]' />
   <div className='max-w-[450px] break-words'>
<p className='items-center'><span className="font-semibold text-xl">Description</span> : {items?.description}</p>
</div>
<p><span className="font-semibold text-xl">Savory</span>: {items?.savoury}</p>
<p><span className="font-semibold text-xl">Semi-sweet</span>: {items?.semiSweet}</p>
   <p> <span className="font-semibold text-xl">Desserts</span>: {items?.dessert}</p> 

   
  
    </div>
    <div className="mb-12"></div>
    </div>
  )
}

export default MenuDetail