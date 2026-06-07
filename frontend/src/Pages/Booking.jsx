import React from 'react'
import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; 
import '../index.css'

const availability = {
  "2025-07-09": ["11:00", "12:30", "14:00", "18:00", "21:30"],
  "2025-07-10": ["12:00", "13:30", "15:00"],
  "2025-07-13": [],
  "2025-07-19": ["14:00", "16:30", "18:30", "22:00"],
};

const Booking = () =>{
    const [selectedDate, setSelectedDate] = useState("2025-07-09");
    const times = availability[selectedDate] || [];

    const availableDates = Object.keys(availability);
    return(
        <>
          <section id="booking" class="booking-section">
            <h2>Book a Table</h2>
            <div class="booking-container">
                <form id="booking-form">
                    <div class="form-group">
                        <label for="booking-name">Name</label>
                        <input type="text" id="booking-name" required/>
                    </div>
                    <div class="form-group">
                        <label for="booking-email">Email</label>
                        <input type="email" id="booking-email" required/>
                    </div>
                    <div class="form-group">
                        <label for="booking-phone">Phone</label>
                        <input type="tel" id="booking-phone" required/>
                    </div>
                    <div class="form-group">
                        <label for="booking-date">Date</label>
                        <input type="date" id="booking-date" required/>
                    </div>
                    <div class="form-group">
                        <label for="booking-time">Time</label>
                        <input type="time" id="booking-time" required/>
                    </div>
                    <div class="form-group">
                        <label for="booking-guests">Number of Guests</label>
                        <select id="booking-guests" required>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4">4 People</option>
                            <option value="5">5 People</option>
                            <option value="6">6 People</option>
                            <option value="7">7 People</option>
                            <option value="8">8 People</option>
                            <option value="9">9+ People</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="booking-notes">Special Requests</label>
                        <textarea id="booking-notes" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn">Book Table</button>
                </form>
                <div class="booking-calendar">
                    <h3>Availability</h3>

                </div>
            </div>
        </section>
        </>
    )
}

export default Booking