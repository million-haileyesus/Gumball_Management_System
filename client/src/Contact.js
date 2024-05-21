// Contact.js
import React from 'react';
import './Styles/Contact.css';

const Contact = () => {
    return (
        <div class='content'>
            <section id="contact">
                <h2>Contact Us</h2>
                <form>
                    <label htmlFor="fname">First name:</label>
                    <input type="text" id="fname" name="fname" />
                    <label htmlFor="lname">Last name:</label>
                    <input type="text" id="lname" name="lname" />
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" /><br />
                    <label htmlFor="PhoneNumber">Phone Number:</label>
                    <input type="text" id="PhoneNumber" name="PhoneNumber" />
                    <label htmlFor="Message">Message:</label>
                    <input type="text" id="Message" name="Message" placeholder/><br />
                    <input type="submit" value="Submit" id="SubmitButton" />
                </form>
            </section>
        </div>
    );
}

export default Contact;
