import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import BookingItem from './pages/BookingItem'
import Special from './pages/Special'
import SeeSpecial from './pages/SeeSpecial'
import SpecialItem from './pages/SpecialItem'
import SeeMyBooking from './pages/SeeMyBooking'
import AllMyBookings from './pages/AllMyBookings'
import { UserContextProvider } from './context/UserContext'
import MenuPage from './pages/MenuPage'
import MenuTable from './pages/menuTable'
import MenuDetail from './pages/MenuDetail'
import EditMenu from './pages/EditMenu'
import CrockeryPage from './pages/CrockeryPage'
import CrockeryTable from './pages/CrockeryTable'
import CrockeryDetail from './pages/CrockeryDetail'

const App = () => {
  return (
    <UserContextProvider>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/register" element={<Register />}/>
    <Route exact path="/admin" element={<AdminLogin />}/>
    <Route exact path="/dashboard" element={<Dashboard />}/>
    <Route exact path="/bookingitem/:id" element={<BookingItem />}/>
    <Route exact path="/special" element={<Special />}/>
    <Route exact path="/seespecial" element={<SeeSpecial />}/>
    <Route exact path="/specialitem/:id" element={<SpecialItem />}/>
    <Route exact path="/allmybookings/:id" element={<AllMyBookings />}/>
    <Route exact path="/seemybooking/:id" element={<SeeMyBooking />}/>
    <Route exact path="/menupage" element={<MenuPage/>}/>
    <Route exact path="/menutable" element={<MenuTable/>}/>
    <Route exact path="/menudetail/:id" element={<MenuDetail/>}/>
    <Route exact path="/crockerydetail/:id" element={<CrockeryDetail/>}/>
    <Route exact path="/editmenu/:id" element={<EditMenu/>}/>
    <Route exact path="/crockerypage" element={<CrockeryPage/>}/>
    <Route exact path="/crockerytable" element={<CrockeryTable/>}/>


    
    </Routes>
     </UserContextProvider>
  )
}

export default App