import React, {useState} from 'react'
import Navbar from '../components/Navbar'

const usersData = [
    { id:1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', menu: 'Celebration Tea', time: '11:30 - 2:30', date: '2023-01-01' },
    { id:2, firstName: 'James', lastName: 'Doner', email: 'john@example.com', menu: 'Royal Tea', time: '11:30 - 2:30', date: '2023-01-01' },
    
  ];

const MyOrders = () => {
    const [users, setUsers] = useState(usersData);
  return (
    <>
    <Navbar />
    <div className='bg-[#F6EADF] py-4'>
        
    <p className='text-center text-2xl text-[#5b3e31]'>My Orders</p>
    <div className='px-24'>
      <table className="w-full bg-white border text-left border-gray-200 mt-16">
        <thead className='bg-[#d8cbc4]  text-[#5b3e31]rounded-2xl'>
          <tr>
            <th className="py-2 px-11">First Name</th>
            <th className="py-2 px-11">Last Name</th>
            <th className="py-2 px-11">Email</th>
            <th className="py-2 px-11">Menu</th>
            <th className="py-2 px-11">time</th>
            
            <th className="py-2 px-11">Date</th>
           
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} onClick={() => setShowModal(!showModal)} className=' border-b border-gray-300 text-gray-500'>
              <td className="py-2 px-11">{user.firstName}</td>
              <td className="py-2 px-11">{user.lastName}</td>
              <td className="py-2 px-11">{user.email}</td>
              <td className="py-2 px-11">{user.menu}</td>
              <td className="py-2 px-11">{user.time}</td>
              <td className="py-2 px-11">{user.date}</td>
             


            </tr>
          ))}
        </tbody>
      </table>
      </div>

      </div>
    </>
  )
}

export default MyOrders