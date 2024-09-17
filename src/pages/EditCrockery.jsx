// import React, {useEffect, useState} from 'react'
// import { URL } from '../url';
// import axios from "axios"
// import { Link, useNavigate, useParams } from "react-router-dom"



// const EditCrockery = () => {
//     const crockeryId = useParams().id;
//     const treatId = useParams().id;
//     const navigate = useNavigate()
//     const [crockery, setCrockery] = useState([])
//     const [description, setDescription] = useState('')
//     const [price, setPrice] = useState('')
    
//     const [file,setFile]=useState(null)
//     const [isLoading, setIsLoading] = useState(false)

//     const [error, setError] = useState(false)



//     const fetchMenu = async () => {
//         try {
//           const res = await axios.get(URL+"/api/crockerys/"+crockeryId);
//           console.log(res.data)
//           setCrockery(res.data.crockery);
//           setDescription(res.data.description);
//           setPrice(res.data.price);
     
//         } catch (err) {
//           console.log(err);
//         }
//       };
    
//       useEffect(() => {
//         fetchMenu();
//       }, [crockeryId]);



//     const editCrockery = async ()=>{
//     setIsLoading(true)

//         try{

//           const res = await axios.put(URL+"/api/crockerys/"+crockeryId, {crockery, description, imageUrl}
//           )
//            console.log("checking edited menu", res.data)
//           setError(false)
      
//         }
//         catch(err){
//           setError(true)
//           console.log(err)
//         }finally {
//           setIsLoading(false)
          
//         }
//       }
 





//   return (
//     <div className=''>
//         <p className='text-center text-xl mt-16'>Edit Crockery</p>

//         <div className='max-w-[320px] mx-auto mt-16'>
//         <p className=''>Crockery</p>
//         <input value={crockery} onChange={(e) => setCrockery(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

       

//         <p className='mt-4'>Description</p>
//         <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border border-[#F08E1F]  w-full rounded-md px-2 py-1' placeholder='Please put in the description of the full menu'/>
//         <input onChange={(e)=>setFile(e.target.files[0])}  className="border border-[#F08E1F] rounded-md w-full px-3 py-2"  type="file"  />
       

// <div className='w-1/2 mx-auto'>
//         <button onClick={editCrockery} className='bg-[#F08E1F] text-white px-6 py-1 rounded mt-4 '>{isLoading ? 'Loading ...':'Edit Menu'}</button>
//         </div>

      



//         </div>

//         <Link to={'/menutable'}>
//           <div className='text-center text-[#F08E1F] mt-4'>See menus created</div>
//         </Link>

        
//         <p></p>
        
//         </div>
//   )
// }

// export default EditCrockery


import React, { useEffect, useState } from 'react';
import { URL } from '../url';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCrockery = () => {
  const { id: crockeryId } = useParams();
  const navigate = useNavigate();
  const [crockeryName, setCrockeryName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCrockery();
  }, [crockeryId]);

  const fetchCrockery = async () => {
    try {
      const res = await axios.get(`${URL}/api/crockerys/${crockeryId}`);
      const { crockery, description } = res.data;
      setCrockeryName(crockery);
      setDescription(description);
    } catch (err) {
      console.error("Error fetching crockery:", err);
      setError(true);
    }
  };

  const editCrockery = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const formData = new FormData();
    formData.append('crockery', crockeryName);
    formData.append('description', description);
    if (file) {
      formData.append('image', file);
    }

    try {
      const res = await axios.put(`${URL}/api/crockerys/${crockeryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("Crockery edited successfully:", res.data);
      navigate('/crockerytable');
    } catch (err) {
      console.error("Error editing crockery:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Crockery</h2>
      <form onSubmit={editCrockery}>
        <div className="mb-4">
          <label className="block mb-2">Crockery Name</label>
          <input
            type="text"
            value={crockeryName}
            onChange={(e) => setCrockeryName(e.target.value)}
            className="border border-[#F08E1F] w-full rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-[#F08E1F] w-full rounded-md px-2 py-1"
            placeholder="Please put in the description of the crockery"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-[#F08E1F] rounded-md w-full px-3 py-2"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#F08E1F] text-white px-6 py-2 rounded mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Edit Crockery'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">An error occurred. Please try again.</p>}
      <Link to="/crockerytable" className="block text-center text-[#F08E1F] mt-4">
        See crockery list
      </Link>
    </div>
  );
};

export default EditCrockery;