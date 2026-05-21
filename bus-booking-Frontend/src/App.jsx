import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Register from './components/Register'
import axios from "axios";
import { useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import Nav from './components/Nav'
import Protected from './routes/Protected'
import BusDetail from './pages/BusDetail'
import Paymentinfo from './components/Paymentinfo'
import Mybookings from './pages/Mybookings'
import RoleProtected from './routes/RoleProtected'
import Admin from './pages/Admin'
import UserManagment from './pages/UserManagment'
import Error from './pages/Error'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)
  const selector = useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {

  }, [])
  return (

    <>
      <Nav />
      <ToastContainer />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/bus/:id' element={<BusDetail />} />
        <Route path='/payment/:id' element={<Paymentinfo />} />
        <Route path="/mybooking" element={<Mybookings />} />
        <Route path='/auth' element={
          selector ? <Navigate to={"/"} /> : <Register />
        } />
        <Route path='/admin' element={<RoleProtected allowedRoles={["admin", "superadmin"]}>
          <Admin />
        </ RoleProtected >} />
        <Route path='/manage-user' element={<RoleProtected allowedRoles={["superadmin"]}>
          <UserManagment />
        </ RoleProtected >} />
        <Route path='/unauthorized' element={<Error />} />
      </Routes>
    </>
  )
}

export default App;
