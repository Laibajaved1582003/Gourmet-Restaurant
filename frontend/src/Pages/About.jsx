import React from 'react'
import '../index.css'

const About = () =>{
    return(
        <>
        <section id="about" class="about-section">
            <h2>About Gourmet Haven</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>Founded in 2010, Gourmet Haven has been serving exceptional cuisine in a warm and inviting atmosphere. Our chef, with over 20 years of international experience, creates dishes that blend traditional techniques with modern flair.</p>
                    <p>We source our ingredients locally whenever possible, supporting regional farmers and producers. Our commitment to quality extends from our kitchen to your table.</p>
                    <h3>Opening Hours</h3>
                    <ul class="opening-hours">
                        <li>Monday - Thursday: 11:00 AM - 10:00 PM</li>
                        <li>Friday - Saturday: 11:00 AM - 11:00 PM</li>
                        <li>Sunday: 10:00 AM - 9:00 PM</li>
                    </ul>
                </div>
                <div class="about-image">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Restaurant interior"/>
                </div>
            </div>
        </section>       
        </>
    )
}

export default About