import React from 'react'
import '../index.css'

const Contact = () =>{
    return(
        <>
          <section id="contact" class="contact-section">
            <h2>Contact Us</h2>
            <div class="contact-container">
                <div class="contact-info">
                    <h3>Get in Touch</h3>
                    <p><i class="fas fa-map-marker-alt"></i> 123 Culinary Street, Foodville, FC 12345</p>
                    <p><i class="fas fa-phone"></i> (123) 456-7890</p>
                    <p><i class="fas fa-envelope"></i> info@gourmethaven.com</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <form id="contact-form">
                    <div class="form-group">
                        <label for="contact-name">Name</label>
                        <input type="text" id="contact-name" required/>
                    </div>
                    <div class="form-group">
                        <label for="contact-email">Email</label>
                        <input type="email" id="contact-email" required/>
                    </div>
                    <div class="form-group">
                        <label for="contact-subject">Subject</label>
                        <input type="text" id="contact-subject" required/>
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn">Send Message</button>
                </form>
            </div>
        </section>
        </>
    )
}

export default Contact