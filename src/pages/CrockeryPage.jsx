// import React, {useEffect, useState} from 'react'
// import { URL } from '../url';
// import axios from "axios"
// import { Link, useNavigate, useParams } from "react-router-dom"



// const CrockeryPage = () => {
//     const navigate = useNavigate()
//     const [crockery, setCrockery] = useState('')
//     // const [file,setFile]=useState(null)
//     const [fileimage, setPhoto] = useState("")
//     const [description, setDescription] = useState("")
//     const [isLoading, setIsLoading] = useState(false)

//     const [error, setError] = useState(false)


//     const uploadCrockery = async () => {
//       console.log(fileimage);
//       console.log(description);
//       const formData = new FormData();
//       formData.append('crockery', crockery);
//       formData.append('description', description);
//       formData.append('imageUrl', fileimage);

//       console.log(formData)

//       const res = await axios.post(URL + "/api/crockerys/create", formData, {
//         headers: {
//           'Content-Type': "multipart/form-data",
//           // Authorization: `Bearer ${accessToken}`,
//         }
//       });

//       if (res) {
//         console.log(res)
//         setCrockery("")
//         setDescription("")

//       }  
//     }





//     const createCrockery = async (e)=>{
//       e.preventDefault()
//       await uploadCrockery();
//       }
     


   

//   return (
//     <div className=''>
//         <p className='text-center text-xl mt-16'>Crockery Page</p>

//         <div className='max-w-[320px] mx-auto mt-16'>
//         <p className=''>Crockery</p>
//         <input value={crockery} onChange={(e) => setCrockery(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

//         <p className='mt-4'>Description</p>
//         <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border border-[#F08E1F]  w-full rounded-md px-2 py-1' placeholder='Please put in the description of the crockery'/>
//         <input onChange={(e)=>setPhoto(e.target.files[0])}  className="border border-[#F08E1F] rounded-md w-full px-3 py-2"  type="file"  />
       

// <div className='w-1/2 mx-auto'>
//         <button onClick={createCrockery} className='bg-[#F08E1F] text-white px-8 py-1 rounded mt-4 '>{isLoading ? 'Loading ...':'Submit Crockery'}</button>
//         </div>

       
       



//         </div>

//         <Link to={'/crockerytable'}>
//           <div className='text-center text-[#F08E1F] mt-4'>See crockeries created</div>
//         </Link>

        
//         <p></p>
        
//         </div>
//   )
// }

// export default CrockeryPage


import React, { useState } from 'react';
import { URL } from '../url';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateCrockery = () => {
  const navigate = useNavigate();
  const [crockery, setCrockery] = useState({
    name: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCrockery(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      // Create preview URL
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('crockery', crockery.name);
      formData.append('description', crockery.description);
      if (file) {
        formData.append('image', file);
      }

      const res = await axios.post(`${URL}/api/crockerys/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccessMessage('Crockery created successfully');
      setTimeout(() => navigate('/crockerytable'), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred while creating the crockery');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Crockery</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Crockery Name
          </label>
          <input
            type="text"
            name="name"
            value={crockery.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#F08E1F] rounded focus:outline-none focus:ring-2 focus:ring-[#F08E1F]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={crockery.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-[#F08E1F] rounded focus:outline-none focus:ring-2 focus:ring-[#F08E1F]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Upload Image
          </label>
          {previewImage && (
            <img 
              src={previewImage} 
              alt="Preview"
              className="w-32 h-32 object-cover rounded mb-2" 
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-[#F08E1F] rounded focus:outline-none focus:ring-2 focus:ring-[#F08E1F]"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#F08E1F] text-white py-2 px-4 rounded hover:bg-[#E07D0E] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Crockery'}
          </button>
          
          <Link
            to="/crockerytable"
            className="flex-1 text-center py-2 px-4 border border-[#F08E1F] text-[#F08E1F] rounded hover:bg-[#FFF5E9] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateCrockery;