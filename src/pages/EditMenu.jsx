import React, {useEffect, useState} from 'react'
import { URL } from '../url';
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"



const EditMenu = () => {
    const menuId = useParams().id;
    const treatId = useParams().id;
    const navigate = useNavigate()
    const [title, setTitle] = useState([])
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [menus, setMenus] = useState([])
    const [submenu, setSubMenu] = useState([])
    const [submenus, setSubMenus] = useState([])
    const [selectedMenu,setSelectedMenu] = useState([])  
    const [savoury, setSavoury] = useState('')
    const [semiSweet, setSemiSweet] = useState('')
    const [dessert, setDessert] = useState('')
    const [file,setFile]=useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [error, setError] = useState(false)


    const handleMenu = (e) => {
        setSelectedMenu(e.target.value);
      };

    const fetchMenu = async () => {
        try {
          const res = await axios.get(URL+"/api/menus/"+menuId);
          console.log(res.data)
          setTitle(res.data.title);
          setDescription(res.data.description);
          setPrice(res.data.price);
          setSavoury(res.data.savoury);
          setSemiSweet(res.data.semiSweet);
          setDessert(res.data.dessert);
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        fetchMenu();
      }, [menuId]);

      // const fetchTreat = async () => {
      //   try {
      //     const res = await axios.get(URL+"/api/submenus/"+treatId);
      //     console.log(res.data)
          
      //     setSavory(res.data.savory);
      //     setSemiSweet(res.data.semi_sweet);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };

      
      // useEffect(() => {
      //   fetchTreat();
      // }, [treatId]);



    const editMenu = async ()=>{
    setIsLoading(true)

        try{
          // const accessToken = localStorage.getItem("access_token");
          // if(!accessToken){
          //       // Handle the case where the access token is not available
          //   console.error('Access token not found')
          // }
          const res = await axios.put(URL+"/api/menus/"+menuId, {price, title, description, savoury, semiSweet, dessert}, {
            // headers: {
            //   Authorization: `Bearer ${accessToken}`,
            // }
          })
           console.log("checking edited menu", res.data)
          setError(false)
      
        }
        catch(err){
          setError(true)
          console.log(err)
        }finally {
          setIsLoading(false)
          
        }
      }
    




  return (
    <div className=''>
        <p className='text-center text-xl mt-16'>Edit Menu</p>

        <div className='max-w-[320px] mx-auto mt-16'>
        <p className=''>Menu</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <p className='mt-4'>Price</p>
        <input value={price} onChange={(e) => setPrice(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <p className='mt-4'>Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border border-[#F08E1F]  w-full rounded-md px-2 py-1' placeholder='Please put in the description of the full menu'/>
        <input onChange={(e)=>setFile(e.target.files[0])}  className="border border-[#F08E1F] rounded-md w-full px-3 py-2"  type="file"  />
       



        <p className='mt-4'>savory</p>
        <input value={savoury} onChange={(e) => setSavoury(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2  py-1' placeholder=''/>

        <p className='mt-4'>semi sweet</p>
        <input value={semiSweet} onChange={(e) => setSemiSweet(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <p className='mt-4'>dessert</p>
        <input value={dessert} onChange={(e)=> setDessert(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <select value={selectedMenu} onChange={handleMenu} className="border border-gray-300 text-gray-500 px-2 py-1 mt-4">
            <option value="">SELECT MENU:</option>
            {menus.map(item => (
              <option key={item.id} value={item.id}>{item.menu}</option>
            ) )}
          </select>


          <div className='w-1/2 mx-auto'>
        <button onClick={editMenu} className='bg-[#F08E1F] text-white px-6 py-1 rounded mt-4 '>{isLoading ? 'Loading ...':'Edit Menu'}</button>
        </div>




        </div>

        <Link to={'/menutable'}>
          <div className='text-center text-[#F08E1F] mt-4'>See menus created</div>
        </Link>

        
        <p></p>
        
        </div>
  )
}

export default EditMenu