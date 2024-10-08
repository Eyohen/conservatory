import React, { useEffect, useState } from 'react'
import { URL } from '../url';
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"



const MenuPage = () => {
  const navigate = useNavigate()
  const [menuId, setMenuId] = useState([])
  const [menus, setMenus] = useState([])
  const [selectedMenu, setSelectedMenu] = useState([])
  const [savory, setSavory] = useState('')
  const [semi_sweet, setSemiSweet] = useState('')
  const [dessert, setDessert] = useState('')
  const [fileimage, setPhoto] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [error, setError] = useState(false)





  const handleMenu = (e) => {
    setSelectedMenu(e.target.value);
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.get(URL + "/api/menus/");
      console.log('checking menu', res.data)
      setMenus(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);


  const uploadMenu = async () => {

    console.log(fileimage);
    console.log(description);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('imageUrl', fileimage);

    console.log(formData);

    // try {
      // const accessToken = localStorage.getItem("access_token");
      // if(!accessToken){
      //       // Handle the case where the access token is not available
      //   console.error('Access token not found')
      // }

      const res = await axios.post(URL + "/api/menus/create", formData,{
          headers: {
            'Content-Type': "multipart/form-data",
            // Authorization: `Bearer ${accessToken}`,
          }
        });

        if (res) {
          console.log(res)
          setTitle("")
          setDescription("")
          setPrice("")
        }  
    }


const createMenu = async (e) => {
  e.preventDefault();
  await uploadMenu();
}




const createTreat = async () => {
  setIsLoading2(true)
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      // Handle the case where the access token is not available
      console.error('Access token not found')
    }


    const res = await axios.post(URL + "/api/submenus/create", { savory, semi_sweet, dessert, menuId: selectedMenu }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    // setSavory(res.data.savory)
    // setSemiSweet(res.data.semi_sweet)
    // setDessert(res.data.dessert)
    // setMenuId(res.data.menuId)
console.log("checking submenus",res.data)
  }
  catch (err) {
    setError(true)
    console.log(err)
  } finally {
    setIsLoading2(false)
    setSavory("")
    setSemiSweet("")
    setDessert("")
    setMenuId("")
  }

}


return (
  <div className=''>
    <p className='text-center text-xl mt-16'>Menu Page</p>

    <div className='max-w-[320px] mx-auto mt-16'>
      <p className=''>Menu</p>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder='Enter Tea name' />

      <p className='mt-4'>Description</p>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border border-[#F08E1F]  w-full rounded-md px-2 py-1' placeholder='Please put in the description of the full menu' />
      <p className='mt-2'>Price</p>
      <input value={price} onChange={(e) => setPrice(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-2' placeholder='Enter the price' />

      <input onChange={(e) => setPhoto(e.target.files[0])} className="border border-[#F08E1F] rounded-md w-full px-3 py-2 mt-2" type="file" />


      <div className='w-1/2 mx-auto'>
        <button onClick={createMenu} className='bg-[#F08E1F] text-white px-6 py-1 rounded mt-4 '>{isLoading ? 'Loading ...' : 'Submit Menu'}</button>
      </div>

      <p className='mt-4'>savory</p>
      <input value={savory} onChange={(e) => setSavory(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2  py-1' placeholder='' />

      <p className='mt-4'>semi sweet</p>
      <input value={semi_sweet} onChange={(e) => setSemiSweet(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder='' />

      <p className='mt-4'>dessert</p>
      <input value={dessert} onChange={(e) => setDessert(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder='' />

      <select value={selectedMenu} onChange={handleMenu} className="border border-gray-300 text-gray-500 px-2 py-1">
        <option value="">SELECT MENU:</option>
        {menus.map(item => (
          <option key={item.id} value={item.id}>{item.title}</option>
        ))}
      </select>

      <div className='w-1/2 mx-auto'>
        <button onClick={createTreat} className='bg-[#F08E1F] text-white px-6 py-1 rounded mt-4 '>{isLoading2 ? 'Loading ...' : 'Submit treats'}</button>
      </div>




    </div>

    <Link to={'/menutable'}>
      <div className='text-center text-[#F08E1F] mt-4'>See menus created</div>
    </Link>


    <p></p>

  </div>
);

};


export default MenuPage;