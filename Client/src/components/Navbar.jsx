import React from 'react'
import Logo from "../assets/Logo"
import "../App.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  const deleteCookie = () =>{
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Replace "your_cookie_name" with the name of your cookie
    setCookieDeleted(true);
    alert("Cookie deleted!");
  }
  return (
    <>
      <div className='navbar'>
        <nav className='flex'>
          <div className='nav-logo'>
          <Link to="/" style={{textDecoration:"None"}}><Logo/></Link>
          </div>
          <div className='user-action'>
            <div className='login'>
            <Link to="/Login" style={{textDecoration:"None"}}><button className='login-btn'>Login</button></Link>
            </div>
            <div className='signup'>
            <Link to="/Register" style={{textDecoration:"None"}}><button className='signup-btn'>Register</button></Link>
            </div>
            <div className='logout'>
            <Link to="/Logout" onClick={deleteCookie} style={{textDecoration:"None"}}><button className='logout-btn'>Log-out</button></Link>
            </div>
          </div>
        </nav>
        </div>
    </>
  )
}

export default Navbar