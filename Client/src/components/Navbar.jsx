import React from 'react'
import Logo from "../assets/Logo"
import "./Navbar.css"
const Navbar = () => {
  return (
    <>
      <div className='navbar'>
          <div className='logo'>
            <Logo/>
          </div>
          <div className='user-action'>
            <div className='login'>
              <button className='login-btn'>Login</button>
            </div>
            <div className='signup'>
              <button className='signup-btn'>Sign up</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar