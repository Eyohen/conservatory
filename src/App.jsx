import React from 'react'
import {Route, Routes} from 'react-router-dom'
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
import EditCrockery from './pages/EditCrockery'
import Intro from './pages/Intro'
import TeaMenu from './pages/TeaMenu'
import MyAccount from './pages/MyAccount'
import MakeBooking from './pages/MakeBooking'
import About from './pages/About'
import MyOrders from './pages/MyOrders'
import BookingConfirmation from './pages/BookingConfirmation'
import GiftOthers from './pages/GiftOthers'
import BookingTable from './pages/BookingTable'
import TeaTable from './pages/TeaTable'
import AdminTable from './pages/AdminTable'
import CreateTeamMember from './pages/CreateTeamMember'
import EditBooking from './pages/EditBooking'

const App = () => {
  return (
    <UserContextProvider>
    <Routes>
    <Route exact path="/" element={<Intro/>}/>
    <Route exact path="/makebooking" element={<MakeBooking/>}/>
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/teamenu" element={<TeaMenu/>}/>
    <Route exact path="/myaccount" element={<MyAccount/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/register" element={<Register />}/>
    <Route exact path="/admin" element={<AdminLogin />}/>
    <Route exact path="/dashboard" element={<Dashboard />}/>
    <Route exact path="/admintable" element={<AdminTable/>}/>
    <Route exact path="/createteammember" element={<CreateTeamMember/>}/>
    <Route exact path="/bookingtable" element={<BookingTable />}/>
    <Route exact path="/editbooking/:id" element={<EditBooking />}/>
    <Route exact path="/bookingitem/:id" element={<BookingItem />}/>
    <Route exact path="/special" element={<Special />}/>
    <Route exact path="/seespecial" element={<SeeSpecial />}/>
    <Route exact path="/specialitem/:id" element={<SpecialItem />}/>
    <Route exact path="/allmybookings/:id" element={<AllMyBookings />}/>
    <Route exact path="/seemybooking/:id" element={<SeeMyBooking />}/>
    <Route exact path="/menupage" element={<MenuPage/>}/>
    <Route exact path="/menutable" element={<MenuTable/>}/>
    <Route exact path="/menudetail/:id" element={<MenuDetail/>}/>
    <Route exact path="/teatable" element={<TeaTable/>}/>
    <Route exact path="/crockerydetail/:id" element={<CrockeryDetail/>}/>
    <Route exact path="/editmenu/:id" element={<EditMenu/>}/>
    <Route exact path="/editcrockery/:id" element={<EditCrockery/>}/>
    <Route exact path="/crockerypage" element={<CrockeryPage/>}/>
    <Route exact path="/crockerytable" element={<CrockeryTable/>}/>
    <Route exact path="/myorders" element={<MyOrders/>}/>
    <Route exact path="/bookingconfirmation/:id" element={<BookingConfirmation/>}/>
    <Route exact path="/giftothers" element={<GiftOthers/>}/>


    
    </Routes>
     </UserContextProvider>
  )
}

export default App