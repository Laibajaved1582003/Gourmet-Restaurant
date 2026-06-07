import React from 'react'
import '../index.css'

const Footer = () =>{
    return(
        <>
         <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Gourmet Haven</h3>
                    <p>Fine dining with a focus on local, seasonal ingredients.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#menu">Menu</a></li>
                        <li><a href="#order">Order Online</a></li>
                        <li><a href="#booking">Book a Table</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>123 Culinary Street</p>
                    <p>Foodville, FC 12345</p>
                    <p>(123) 456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Gourmet Haven. All rights reserved.</p>
            </div>
        </footer>
        </>
    )
}

export default Footer