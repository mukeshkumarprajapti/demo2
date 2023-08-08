import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Singup from './components/Singup'
import Logout from './components/Logout'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import Changepassword from './components/Changepassword'


const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/contact" element={<Contact/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/singup" element={<Singup/>}/>
    <Route exact path="/logout" element={<Logout/>}/>
    <Route exact path="/forgetpassword/:id/:token"element={<ForgetPassword/>}/>
    <Route exact path="/resetpassword" element={<ResetPassword/>}/>
    <Route exact path="/changepassword" element={<Changepassword/>}/>
    
    </Routes>
    
    </>
  )
}

export default App