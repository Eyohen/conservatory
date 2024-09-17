import React, {useEffect, useState} from 'react'
import { URL } from '../url';
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"



const CrockeryPage = () => {
    const navigate = useNavigate()
    const [crockery, setCrockery] = useState('')
    // const [file,setFile]=useState(null)
    const [fileimage, setPhoto] = useState("")
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState(false)


    const uploadCrockery = async () => {
      console.log(fileimage);
      console.log(description);
      const formData = new FormData();
      formData.append('crockery', crockery);
      formData.append('description', description);
      formData.append('imageUrl', fileimage);

      console.log(formData)

      const res = await axios.post(URL + "/api/crockerys/create", formData, {
        headers: {
          'Content-Type': "multipart/form-data",
          // Authorization: `Bearer ${accessToken}`,
        }
      });

      if (res) {
        console.log(res)
        setCrockery("")
        setDescription("")

      }  
    }





    const createCrockery = async (e)=>{
      e.preventDefault()
      await uploadCrockery();
      }
     


   

  return (
    <div className=''>
        <p className='text-center text-xl mt-16'>Crockery Page</p>

        <div className='max-w-[320px] mx-auto mt-16'>
        <p className=''>Crockery</p>
        <input value={crockery} onChange={(e) => setCrockery(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <p className='mt-4'>Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border border-[#F08E1F]  w-full rounded-md px-2 py-1' placeholder='Please put in the description of the crockery'/>
        <input onChange={(e)=>setPhoto(e.target.files[0])}  className="border border-[#F08E1F] rounded-md w-full px-3 py-2"  type="file"  />
       

<div className='w-1/2 mx-auto'>
        <button onClick={createCrockery} className='bg-[#F08E1F] text-white px-8 py-1 rounded mt-4 '>{isLoading ? 'Loading ...':'Submit Crockery'}</button>
        </div>

       
       



        </div>

        <Link to={'/crockerytable'}>
          <div className='text-center text-[#F08E1F] mt-4'>See crockeries created</div>
        </Link>

        
        <p></p>
        
        </div>
  )
}

export default CrockeryPage