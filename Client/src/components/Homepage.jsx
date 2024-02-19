import React from 'react'
import "./Homepage.css"
import Logo from '../assets/Logo'

const Homepage = () => {
    return (
        <>
            <div className='container'>
                <div className='body'>
                    <div className='logo'>
                        <div className='website-name'>
                            <Logo />
                        </div>
                        <div className='tagline'>
                            <h1>Welcome, to a collection of funniest memes</h1>
                        </div>
                    </div>
                    <div className='redirect'>
                        <button className='enter'>Enter</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage