// import React, {useEffect, useState} from 'react'
// import Navbar from '../components/Navbar'
// import { URL } from '../url';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const usersData = [
//     { id:1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', menu: 'Celebration Tea', time: '11:30 - 2:30', date: '2023-01-01' },
//     { id:2, firstName: 'James', lastName: 'Doner', email: 'john@example.com', menu: 'Royal Tea', time: '11:30 - 2:30', date: '2023-01-01' },
    
//   ];

// const MyOrders = () => {
//   const {user} = useAuth()
//   const [users, setUsers] = useState(usersData);


//   const fetchBookings = async () => {
//      const res = await axios.get(`${URL}/api/bookings/user/${user?.id}`)
//      console.log()
//      setUsers(res.data)
//   }
  
//   useEffect(() => {
//     fetchBookings()
//   },[])



//   return (
//     <>
//     <Navbar />
//     <div className='bg-[#F6EADF] py-4'>
        
//     <p className='text-center text-2xl text-[#5b3e31]'>My Orders</p>
//     <div className='px-24'>
//       <table className="w-full bg-white border text-left border-gray-200 mt-16">
//         <thead className='bg-[#d8cbc4]  text-[#5b3e31]rounded-2xl'>
//           <tr>
//             <th className="py-2 px-11">Menu</th>
//             <th className="py-2 px-11">Email</th>
//             <th className="py-2 px-11">Tea</th>
//             <th className="py-2 px-11">Menu</th>
//             <th className="py-2 px-11">time</th>
            
//             <th className="py-2 px-11">Date</th>
           
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user.id} onClick={() => setShowModal(!showModal)} className=' border-b border-gray-300 text-gray-500'>
//               <td className="py-2 px-11">{user.menu}</td>
//               <td className="py-2 px-11">{user.email}</td>
//               <td className="py-2 px-11">{user.tea}</td>
//               <td className="py-2 px-11">{user.menu}</td>
//               <td className="py-2 px-11">{user.time}</td>
//               <td className="py-2 px-11">{new Date(user.date).toDateString()}</td>
             


//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>

//       </div>
//     </>
//   )
// }

// export default MyOrders

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { URL } from '../url';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MyOrders = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(`${URL}/api/bookings/user/${user?.id}`)
    setUsers(res.data)
  }
  
  useEffect(() => {
    fetchBookings()
  }, [user?.id])

  return (
    <div className="bg-[#F6EADF] min-h-screen">
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-center text-2xl md:text-3xl text-[#5b3e31] mb-8'>My Orders</h1>
        
        {/* Desktop view */}
        <div className='hidden md:block overflow-x-auto'>
          <table className="w-full bg-white border border-gray-200">
            <thead className='bg-[#d8cbc4] text-[#5b3e31]'>
              <tr>
                <th className="py-2 px-4">Menu</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Tea</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className='border-b border-gray-300 text-gray-500'>
                  <td className="py-2 px-4">{user.menu}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.tea}</td>
                  <td className="py-2 px-4">{user.time}</td>
                  <td className="py-2 px-4">{new Date(user.date).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className='md:hidden'>
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <p className="font-bold text-[#5b3e31]">{user.menu}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">Tea: {user.tea}</p>
              <p className="text-gray-600">Time: {user.time}</p>
              <p className="text-gray-600">Date: {new Date(user.date).toDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyOrders