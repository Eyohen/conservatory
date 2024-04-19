import React,{useState} from "react";
import { URL } from '../url'
import DatePicker from "react-datepicker";
import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";


const statuses = [
  {
    _id: 1,
    status: "not-done",
    },
    {
        _id: 2,
        status: "pending",
    },
    {
        _id: 3,
        status: "completed",
    },
   
    ]

    const priorities = [
      {
          _id: 1,
          priority: "high",
      },
      {
          _id: 2,
          priority: "medium",
      },
      {
        _id: 3,
        priority: "low",
    },
      ]

const Special = () => {
  const navigate = useNavigate()

    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [description,setDescription]=useState("")
  
    const [error,setError]=useState(false)
    const [isLoading,setIsLoading]=useState(false)


      const handleTask = async ()=>{
        setIsLoading(true)
        try{
          const accessToken = localStorage.getItem("access_token");

          if(!accessToken){
                // Handle the case where the access token is not available
            console.error('Access token not found')
          }

          const res = await axios.post(URL+"/api/specials/create",{fullName,email,description}, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          setFullName(res.data.client)
          setEmail(res.data.work)
          setDescription(res.data.date)
   

          
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
    <div className="w-full">
    
      <div className="items-center h-[100vh] justify-center flex w-full">
        {isLoading ? (<p className="text-2xl">Loading...</p>) : ( <div className="flex flex-col gap-y-6">
        <p className="text-2xl text-center text-[#ffb640]">We'd love to get your special request</p>
          <input onChange={(e)=>setFullName(e.target.value)} className="border border-[#ffb640] px-2 py-1 w-full md:w-[500px] text-[#ffb640]" placeholder="Full Name" />
          <input onChange={(e)=>setEmail(e.target.value)} className="border border-[#ffb640] px-2 py-1 text-[#ffb640]" placeholder="Email " />
          <textarea onChange={(e)=>setDescription(e.target.value)} className="border border-[#ffb640] px-2 py-1 text-[#ffb640]" placeholder="Request ... " />
        
<button onClick={handleTask} className="bg-[#ffb640] text-white py-1 rounded">{isLoading ? "Loading..." : "Submit"} </button>
{error && <h3 className="text-red-500 text-md ">Something went wrong</h3>}
          
        </div>)}
       
      </div>
    </div>
  );
};

export default Special;
