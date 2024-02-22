import React, { useState } from 'react'
import Navbar from "./Navbar"
import "../App.css"
import entities from '../../../Backend/data/meme_entities.json'

const Mainpage = () => {
    const [isHovering, setIsHovering] = useState(false);

    return (
    <>
        <div className='container'>
        <Navbar/>
        <div className='Suggestions'>
            <p id="sgst">Suggestions</p>
            <button id='sgst-btn'>Technology</button>
            <button id="sgst-btn">Gaming</button>
            <button id="sgst-btn">Relationships</button>
            <button id="sgst-btn">Sports</button>
        </div>
        <div className='filters'>
        <button id="filter-btn">Pop Culture</button>
        <button id="filter-btn">Animals and Pets</button>

<button id="filter-btn">Food
</button>

<button id="filter-btn">
  Technology
</button>

<button id="filter-btn">
  Gaming
</button>

<button id="filter-btn">
  Relationships
</button>

<button id="filter-btn">
  Sports
</button>

<button id="filter-btn">
  School
</button>

<button id="filter-btn">
Corporate
</button>
        </div>
        </div>
          <div className='meme-container'>
          {entities.map((entity) => (
                <div className="meme-card">
                      {/* <button className="btns">delete</button> */}
                      {/* <button className="btns">update</button> */}
                      <div className='layer-1' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        <img className="meme-image" src={entity.image}/>
                      </div>
                      <div className='details-1' style={{display: isHovering ? 'block':'none'}}>
                        <p className='username'>@{entity.user}</p>
                        <p className="title">{entity.memeTitle}</p>
                      </div>
                </div>
          ))}
          </div>
    </>
    )
}

export default Mainpage