import React, {useEffect, useState} from 'react'
import { URL } from '../url';
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"



const CrockeryPage = () => {
    const navigate = useNavigate()
    const [crockery, setCrockery] = useState('')
    const [file,setFile]=useState(null)
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState(false)








    const createCrockery = async (e)=>{
      e.preventDefault()
      const event = {
        crockery,
        description
      }
      if(file){
        const data=new FormData()
        const filename=Date.now()+file.name
        data.append("img",filename)
        data.append("file",file)
        event.photo=filename
        console.log(data)
        setIsLoading(true)
        try{
          const accessToken = localStorage.getItem("access_token");
          if(!accessToken){
                // Handle the case where the access token is not available
            console.error('Access token not found')
          }

          const imgUpload = await axios.post(URL+"/api/upload",data, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
           
          const res = await axios.post(URL+"/api/crockerys/create", event, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          setCrockery(res.data.menu)
          setDescription(res.data.description)          
          setError(false)
          navigate("/crockerypage")
        }
        catch(err){
          setError(true)
          console.log(err)
        }finally {
          setIsLoading(false)
          setCrockery("")
          setDescription('')
        }
      }
    }


   

  return (
    <div className=''>
        <p className='text-center text-xl mt-16'>Crockery Page</p>

        <div className='max-w-[320px] mx-auto mt-16'>
        <p className=''>Crockery</p>
        <input value={crockery} onChange={(e) => setCrockery(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <p className='mt-4'>Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border border-[#F08E1F]  w-full rounded-md px-2 py-1' placeholder='Please put in the description of the crockery'/>
        <input onChange={(e)=>setFile(e.target.files[0])}  className="border border-[#F08E1F] rounded-md w-full px-3 py-2"  type="file"  />
       

<div className='w-1/2 mx-auto'>
        <button onClick={createCrockery} className='bg-[#F08E1F] text-white px-6 py-1 rounded mt-4 '>{isLoading ? 'Loading ...':'Submit Crockery'}</button>
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