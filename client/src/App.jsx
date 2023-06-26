import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Singup from './components/Singup'


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
    
    </Routes>
    
    </>
  )
}

export default App