import React , { useState } from "react"
import Homepage from './components/Homepage'
import Mainpage from './components/Mainpage'
import { Route, Routes } from 'react-router-dom'
import Login from "./components/Login"
import Register from "./components/Register"

import './App.css'

function App() {
  return (
    <div className="container">
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/Mainpage' element={<Mainpage/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
        </Routes>
    </div>
  )
}

export default App;