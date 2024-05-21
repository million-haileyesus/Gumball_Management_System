// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Styles/Login.css';
import pic from './static/images/squareGundam.jpg';

const Login = () => {
    const [error, setError] = useState('');
    const [credentials, setCredentials] = useState({
        email: sessionStorage.getItem('loginEmail') || '',
        password: ''
    });
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));

        if (name === 'email') {
            sessionStorage.setItem('loginEmail', value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error(`Failed to login. Status: ${response.status}`);
            }

            const data = await response.json();
            alert(data.message); // Display success message (consider a more user-friendly way)

            let expires = new Date();
            expires.setTime(expires.getTime() + (180 * 1000)); // Three minutes expiration date

            // Set cookies for user authentication
            setCookie('token', data.token, { path: '/', expires });

            // Store JWT token in localStorage
            localStorage.setItem('token', data.token);

            // Clear input fields after successful login
            setCredentials({ email: '', password: '' });

            // Redirect to home page
            navigate('/');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error('Login error', err);
        }
    };

    return (
        <div className="login-container">
            <div id="mainBlock">
                <div className="square" id="leftSquare">
                    <div id="leftContent">
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">
                                Email:
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <br />
                            <label htmlFor="password">
                                Password:
                                <input
                                    type="password"
                                    id="passwordInput"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <br />
                            <input type="submit" id="logButton" value="Log In" />
                            {error && <p className="error-message">{error}</p>} {/* Display error message */}
                        </form>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
                <div className="square" id="rightSquare">
                    <img src={pic} alt="Square Gundam" />
                </div>
            </div>
        </div>
    );
};

export default Login;
