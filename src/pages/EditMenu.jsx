// import React, {useEffect, useState} from 'react'
// import { URL } from '../url';
// import axios from "axios"
// import { Link, useNavigate, useParams } from "react-router-dom"



// const EditMenu = () => {
//     const menuId = useParams().id;
//     const treatId = useParams().id;
//     const navigate = useNavigate()
//     const [title, setTitle] = useState([])
//     const [description, setDescription] = useState('')
//     const [price, setPrice] = useState('')
//     const [menus, setMenus] = useState([])
//     const [submenu, setSubMenu] = useState([])
//     const [submenus, setSubMenus] = useState([])
//     const [selectedMenu,setSelectedMenu] = useState([])  
//     const [savoury, setSavoury] = useState('')
//     const [semiSweet, setSemiSweet] = useState('')
//     const [dessert, setDessert] = useState('')
//     const [file,setFile]=useState(null)
//     const [isLoading, setIsLoading] = useState(false)
//     const [isLoading2, setIsLoading2] = useState(false)
//     const [error, setError] = useState(false)


//     const handleMenu = (e) => {
//         setSelectedMenu(e.target.value);
//       };

//     const fetchMenu = async () => {
//         try {
//           const res = await axios.get(URL+"/api/menus/"+menuId);
//           console.log(res.data)
//           setTitle(res.data.title);
//           setDescription(res.data.description);
//           setPrice(res.data.price);
//           setSavoury(res.data.savoury);
//           setSemiSweet(res.data.semiSweet);
//           setDessert(res.data.dessert);
//         } catch (err) {
//           console.log(err);
//         }
//       };
    
//       useEffect(() => {
//         fetchMenu();
//       }, [menuId]);

//       // const fetchTreat = async () => {
//       //   try {
//       //     const res = await axios.get(URL+"/api/submenus/"+treatId);
//       //     console.log(res.data)
          
//       //     setSavory(res.data.savory);
//       //     setSemiSweet(res.data.semi_sweet);
//       //   } catch (err) {
//       //     console.log(err);
//       //   }
//       // };

      
//       // useEffect(() => {
//       //   fetchTreat();
//       // }, [treatId]);



//     const editMenu = async ()=>{
//     setIsLoading(true)

//         try{
//           // const accessToken = localStorage.getItem("access_token");
//           // if(!accessToken){
//           //       // Handle the case where the access token is not available
//           //   console.error('Access token not found')
//           // }
//           const res = await axios.put(URL+"/api/menus/"+menuId, {price, title, description, savoury, semiSweet, dessert}, {
//             // headers: {
//             //   Authorization: `Bearer ${accessToken}`,
//             // }
//           })
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
//         <p className='text-center text-xl mt-16'>Edit Menu</p>

//         <div className='max-w-[320px] mx-auto mt-16'>
//         <p className=''>Menu</p>
//         <input value={title} onChange={(e) => setTitle(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

//         <p className='mt-4'>Price</p>
//         <input value={price} onChange={(e) => setPrice(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

//         <p className='mt-4'>Description</p>
//         <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border border-[#F08E1F]  w-full rounded-md px-2 py-1' placeholder='Please put in the description of the full menu'/>
//         <input onChange={(e)=>setFile(e.target.files[0])}  className="border border-[#F08E1F] rounded-md w-full px-3 py-2"  type="file"  />
       



//         <p className='mt-4'>savory</p>
//         <input value={savoury} onChange={(e) => setSavoury(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2  py-1' placeholder=''/>

//         <p className='mt-4'>semi sweet</p>
//         <input value={semiSweet} onChange={(e) => setSemiSweet(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

//         <p className='mt-4'>dessert</p>
//         <input value={dessert} onChange={(e)=> setDessert(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

//         <select value={selectedMenu} onChange={handleMenu} className="border border-gray-300 text-gray-500 px-2 py-1 mt-4">
//             <option value="">SELECT MENU:</option>
//             {menus.map(item => (
//               <option key={item.id} value={item.id}>{item.menu}</option>
//             ) )}
//           </select>


//           <div className='w-1/2 mx-auto'>
//         <button onClick={editMenu} className='bg-[#F08E1F] text-white px-6 py-1 rounded mt-4 '>{isLoading ? 'Loading ...':'Edit Menu'}</button>
//         </div>




//         </div>

//         <Link to={'/menutable'}>
//           <div className='text-center text-[#F08E1F] mt-4'>See menus created</div>
//         </Link>

        
//         <p></p>
        
//         </div>
//   )
// }

// export default EditMenu


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';

const EditMenu = () => {
  const { id: menuId } = useParams();
  const navigate = useNavigate();

  // Form states
  const [menuData, setMenuData] = useState({
    title: '',
    price: '',
    description: '',
    savoury: '',
    semiSweet: '',
    dessert: '',
    imageUrl: ''
  });

  // Add new state for selected file
  const [selectedFile, setSelectedFile] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState({
    fetch: false,
    content: false,
    image: false
  });
  const [error, setError] = useState({
    content: null,
    image: null
  });
  const [success, setSuccess] = useState({
    content: false,
    image: false
  });

  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(prev => ({ ...prev, fetch: true }));
      try {
        const res = await axios.get(`${URL}/api/menus/${menuId}`);
        setMenuData(res.data);
      } catch (err) {
        setError(prev => ({ 
          ...prev, 
          content: 'Failed to fetch menu data' 
        }));
      } finally {
        setLoading(prev => ({ ...prev, fetch: false }));
      }
    };
    fetchMenu();
  }, [menuId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setError(prev => ({ ...prev, image: null }));
    }
  };

  // Handle content update
  const handleContentUpdate = async () => {
    setLoading(prev => ({ ...prev, content: true }));
    setError(prev => ({ ...prev, content: null }));
    setSuccess(prev => ({ ...prev, content: false }));

    const contentData = {
      title: menuData.title,
      price: menuData.price,
      description: menuData.description,
      savoury: menuData.savoury,
      semiSweet: menuData.semiSweet,
      dessert: menuData.dessert
    };

    try {
      const res = await axios.put(`${URL}/api/menus/${menuId}`, contentData);
      setMenuData(res.data);
      setSuccess(prev => ({ ...prev, content: true }));
      
      setTimeout(() => {
        setSuccess(prev => ({ ...prev, content: false }));
      }, 3000);
    } catch (err) {
      setError(prev => ({ 
        ...prev, 
        content: err.response?.data?.message || 'Failed to update menu content' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, content: false }));
    }
  };

  // Handle image update
  const handleImageUpdate = async () => {
    if (!selectedFile) {
      setError(prev => ({ ...prev, image: 'Please select an image first' }));
      return;
    }
  
    setLoading(prev => ({ ...prev, image: true }));
    setError(prev => ({ ...prev, image: null }));
    setSuccess(prev => ({ ...prev, image: false }));
  
    const formData = new FormData();
    // Changed to match Multer's expected field name 'imageUrl'
    formData.append('imageUrl', selectedFile);
  
    try {
      const res = await axios.put(`${URL}/api/menus/${menuId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMenuData(prev => ({
        ...prev,
        imageUrl: res.data.imageUrl
      }));
      setSuccess(prev => ({ ...prev, image: true }));
      setSelectedFile(null);
      
      setTimeout(() => {
        setSuccess(prev => ({ ...prev, image: false }));
      }, 3000);
    } catch (err) {
      console.error("Upload error:", err.response || err);
      setError(prev => ({ 
        ...prev, 
        image: err.response?.data?.message || 'Failed to update image' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, image: false }));
    }
  };

  if (loading.fetch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Menu
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Content Update Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 pb-4 border-b border-gray-200">
              Menu Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  name="title"
                  value={menuData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="Menu title"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  name="price"
                  value={menuData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="Menu price"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={menuData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all min-h-[100px] resize-y"
                placeholder="Menu description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Savoury Items</label>
                <input
                  name="savoury"
                  value={menuData.savoury}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="Savoury items"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Semi-Sweet Items</label>
                <input
                  name="semiSweet"
                  value={menuData.semiSweet}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="Semi-sweet items"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Dessert Items</label>
                <input
                  name="dessert"
                  value={menuData.dessert}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="Dessert items"
                />
              </div>
            </div>

            {error.content && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">
                {error.content}
              </div>
            )}

            {success.content && (
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-md">
                Menu details updated successfully!
              </div>
            )}

            <button 
              onClick={handleContentUpdate}
              disabled={loading.content}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.content ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                  Updating...
                </span>
              ) : 'Update Menu Details'}
            </button>
          </div>

          {/* Image Update Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 pb-4 border-b border-gray-200">
              Menu Image
            </h2>
            
            {menuData.imageUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={menuData.imageUrl} 
                  alt="Menu" 
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Update Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              
              {/* Add separate upload button */}
              <button
                onClick={handleImageUpdate}
                disabled={loading.image || !selectedFile}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading.image ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                    Uploading...
                  </span>
                ) : 'Upload Image'}
              </button>
            </div>

            {error.image && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">
                {error.image}
              </div>
            )}

            {success.image && (
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-md">
                Image updated successfully!
              </div>
            )}
          </div>
        </div>

        <Link 
          to="/menutable" 
          className="block text-center text-orange-500 hover:text-orange-600 mt-6 font-medium"
        >
          ← Back to Menu Table
        </Link>
      </div>
    </div>
  );
};

export default EditMenu;