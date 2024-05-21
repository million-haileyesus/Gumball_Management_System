import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Login.css';
import pic from './static/images/squareGundam.jpg';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signupUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/users/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessage('User registered successfully!');
            alert(data.message); 
            // onRegisterSuccess();
            // setUsername(data.user.username);
            // Clear form inputs after successful registration
            setFormData({
                username: '',
                email: '',
                password: ''
            });
            navigate('/');

        } catch (err) {
            setMessage('Failed to register. Please try again.');
            console.error('Signup error', err);
        }
    };

    return (
        <div className="login-container">
            <div id="mainBlock">
                <div className="square" id="leftSquare">
                    <div id="leftContent">
                        <h1>Sign Up</h1>
                        <form onSubmit={signupUser}>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                                required
                            />
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                required
                            />
                            <input type="submit" id="logButton" value="Register" />
                            {message && <p className="message">{message}</p>}
                        </form>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
                <div className="square" id="rightSquare">
                    <img src={pic} alt="Square Gundam" />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
