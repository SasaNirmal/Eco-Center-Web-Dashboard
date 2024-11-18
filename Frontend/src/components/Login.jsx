import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/signup', {
                username,
                email,
                password,
            });
            Swal.fire({
                icon: 'success',
                title: 'Sign Up Successful',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            setIsSignUp(false);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Sign Up Failed',
                text: err.response?.data?.message || 'Error during sign-up',
                showConfirmButton: true
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/signin', { 
                username,
                password 
            });
            
            localStorage.setItem('token', response.data.token);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/home');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || 'Invalid login credentials',
                showConfirmButton: true
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isSignUp ? 'Eco Center - Sign Up' : 'Eco Center - Sign In'}</h2>
                
                <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                    {isSignUp && (
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Username"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <div className="toggle-form">
                    {isSignUp ? (
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setIsSignUp(false)} className="toggle-link">
                                Sign In
                            </span>
                        </p>
                    ) : (
                        <p>
                            New here?{' '}
                            <span onClick={() => setIsSignUp(true)} className="toggle-link">
                                Sign Up
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
