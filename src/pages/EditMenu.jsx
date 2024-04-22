import React, {useEffect, useState} from 'react'
import { URL } from '../url';
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"



const EditMenu = () => {
    const menuId = useParams().id;
    const treatId = useParams().id;
    const navigate = useNavigate()
    const [menu, setMenu] = useState([])
    const [description, setDescription] = useState('')
    const [menus, setMenus] = useState([])
    const [submenu, setSubMenu] = useState([])
    const [submenus, setSubMenus] = useState([])
    const [selectedMenu,setSelectedMenu] = useState([])  
    const [savory, setSavory] = useState('')
    const [semi_sweet, setSemiSweet] = useState('')
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
          setMenu(res.data.menu);
          setDescription(res.data.description);
        //   setDessert(res.data.submenus.dessert);
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        fetchMenu();
      }, [menuId]);

      const fetchTreat = async () => {
        try {
          const res = await axios.get(URL+"/api/submenus/"+treatId);
          console.log(res.data)
          
          setSavory(res.data.savory);
          setSemiSweet(res.data.semi_sweet);
        } catch (err) {
          console.log(err);
        }
      };

      
      useEffect(() => {
        fetchTreat();
      }, [treatId]);



    const editMenu = async (e)=>{
      e.preventDefault()
      const event = {
        menu,
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
           
          const res = await axios.post(URL+"/api/menus/"+menuId, event, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          setMenu(res.data.menu)
          setDescription(res.data.description)          
          setError(false)
          navigate("/menupage")
        }
        catch(err){
          setError(true)
          console.log(err)
        }finally {
          setIsLoading(false)
          setMenu("")
        }
      }
    }


      const editTreat = async ()=>{
        setIsLoading2(true)
        try{
          const accessToken = localStorage.getItem("access_token");

          if(!accessToken){
                // Handle the case where the access token is not available
            console.error('Access token not found')
          }


          const res = await axios.post(URL+"/api/submenus/"+treatId,{savory, semi_sweet, dessert,menu:selectedMenu}, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          setSavory(res.data.savory)
          setSemiSweet(res.data.semi_sweet)
          setDessert(res.data.dessert)
          setMenu(res.data.menu)
         
       

          
          setError(false)
          navigate("/menupage")
          
        }
        catch(err){
          setError(true)
          console.log(err)
        }finally {
          setIsLoading2(false)
            setSavory("")
            setSemiSweet("")
            setDessert("")
            setMenu("")
        }
    
      }





  return (
    <div className=''>
        <p className='text-center text-xl mt-16'>Edit Menu</p>

        <div className='max-w-[320px] mx-auto mt-16'>
        <p className=''>Menu</p>
        <input value={menu} onChange={(e) => setMenu(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <p className='mt-4'>Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border border-[#F08E1F]  w-full rounded-md px-2 py-1' placeholder='Please put in the description of the full menu'/>
        <input onChange={(e)=>setFile(e.target.files[0])}  className="border border-[#F08E1F] rounded-md w-full px-3 py-2"  type="file"  />
       

<div className='w-1/2 mx-auto'>
        <button onClick={editMenu} className='bg-[#F08E1F] text-white px-6 py-1 rounded mt-4 '>{isLoading ? 'Loading ...':'Submit Menu'}</button>
        </div>

        <p className='mt-4'>savory</p>
        <input value={savory} onChange={(e) => setSavory(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2  py-1' placeholder=''/>

        <p className='mt-4'>semi sweet</p>
        <input value={semi_sweet} onChange={(e) => setSemiSweet(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <p className='mt-4'>dessert</p>
        <input value={dessert} onChange={(e)=> setDessert(e.target.value)} className='border border-[#F08E1F] w-full rounded-md px-2 py-1' placeholder=''/>

        <select value={selectedMenu} onChange={handleMenu} className="border border-gray-300 text-gray-500 px-2 py-1">
            <option value="">SELECT MENU:</option>
            {/* {menus.map(item => (
              <option key={item._id} value={item._id}>{item.menu}</option>
            ) )} */}
          </select>

        <div className='w-1/2 mx-auto'>
        <button onClick={editTreat} className='bg-[#F08E1F] text-white px-6 py-1 rounded mt-4 '>{isLoading2 ? 'Loading ...':'Submit treats'}</button>
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