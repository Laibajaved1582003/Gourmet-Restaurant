import React from 'react'
import Menu from './Menu.jsx'
import Order from './Order.jsx'
import Booking from './Booking.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import '../index.css'

const Home = () => {
    return (
        <>
          <main>
            <section id="home" className="hero">
                <div className="hero-content">
                    <h2>Welcome to Gourmet Haven</h2>
                    <p>Experience culinary excellence with our carefully crafted dishes</p>
                    <div className="hero-buttons">
                        <a href="#order" className="btn">Order Now</a>
                        <a href="#booking" className="btn btn-outline">Reserve a Table</a>
                    </div>
                </div>
            </section>
            <Menu/> 
            <Order/>
            <Booking/>
            <About/>
            <Contact/>
          </main>
        </>
    )
}

export default Home
