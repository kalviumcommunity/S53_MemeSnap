import React from 'react'
import Navbar from "./Navbar"
import Sgst from '../assets/Sgst'
const Mainpage = () => {
    return (
    <>
        <Navbar/>
        <div className='Suggestions'>
            <h2>Suggestions</h2>
            <img src="../assets/3.png"/>
            <button classname='sgst-btn'>Technology</button>
            <button classname='sgst-btn'>Gaming</button>
            <button classname='sgst-btn'>Relationships</button>
            <button classname='sgst-btn'>Sports</button>
        </div>
    </>
    )
}

export default Mainpage