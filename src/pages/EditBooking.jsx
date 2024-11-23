import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { URL } from '../url';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const status = [
    {
        id: 1,
        attended: 'attended'
    },
    {
        id: 2,
        attended: 'unattended'
    }
]

const EditBooking = () => {
    const { id: bookingId } = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [attended, setAttended] = useState('');
    const [loading, setLoading] = useState(false);

    const adminEmail = user?.email;

    const fetchBooking = async () => {
        const res = await axios.get(`${URL}/api/bookings/${bookingId}`)
        setItems(res.data)
        setAttended(res.data.attended) // Set initial attended status
    }

    useEffect(() => {
        fetchBooking()
    }, [bookingId])

    const handleSubmit = async () => {
        setLoading(true)
        const res = await axios.put(`${URL}/api/bookings/${bookingId}`, { 
            attended,
            attendedBy: adminEmail
         })
        if (res.status === 200) {
            setLoading(false)
            navigate('/bookingtable')
        }
    }

    return (
        <div>
            <Sidebar />
            <div className='w-full flex-1 ml-[100px]'>
                <p className='flex justify-center mt-12'>Edit Booking</p>
                <div className="flex justify-center mt-12">
                    <div>
                        <p>
                            <p>Email</p>
                            <input
                                value={items.email || ''}
                                className="border w-[600px] px-3 py-2"
                                readOnly
                            />
                        </p>

                        <p className='mt-4'>
                            <p>Menu</p>
                            <input
                                value={items.menu || ''}
                                className="border w-[600px] px-3 py-2"
                                readOnly
                            />
                        </p>

                        <p className='mt-4'>
                            <p>Tea</p>
                            <input
                                value={items.tea || ''}
                                className="border w-[600px] px-3 py-2"
                                readOnly
                            />
                        </p>

                        <p className='mt-4'>
                            <p>Time</p>
                            <input
                                value={items.time || ''}
                                className="border w-[600px] px-3 py-2"
                                readOnly
                            />
                        </p>

                        <p className='mt-4'>
                            <p>Coffee</p>
                            <input
                                value={items.coffee || ''}
                                className="border w-[600px] px-3 py-2"
                                readOnly
                            />
                        </p>

                        <p className='mt-4'>
                            <p>Ice Tea</p>
                            <input
                                value={items.iceTea || ''}
                                className="border w-[600px] px-3 py-2"
                                readOnly
                            />
                        </p>

                        <p className='mt-4'>
                            <p>Price</p>
                            <input
                                value={items.price || ''}
                                className="border w-[600px] px-3 py-2"
                                readOnly
                            />
                        </p>

                        <p className='mt-4'>
                            <p>Date</p>
                            <input
                                value={items.createdAt ? new Date(items.createdAt).toDateString() : ''}
                                className="border w-[600px] px-3 py-2"
                                readOnly
                            />
                        </p>

                        <p className='mt-4'>
                            <p>Status</p>
                            <select
                                value={attended}
                                onChange={(e) => setAttended(e.target.value)}
                                className="border w-[600px] px-3 py-2"
                            >
                                {status.map((item) => (
                                    <option key={item.id} value={item.attended}>
                                        {item.attended}
                                    </option>
                                ))}
                            </select>
                        </p>

                        <div className='flex justify-center mt-9'>
                            <button 
                                onClick={handleSubmit} 
                                className='bg-[#F08E1F] px-6 py-2 text-white'
                            >
                                {loading ? 'loading...' : 'Edit Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBooking