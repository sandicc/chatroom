import React from 'react';
import './Register.css';

const Register = ({onRouteChange}) => {
    return (
        <div className="registerContainer">
            <h2>Register</h2>
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" placeholder="username" />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" placeholder="email" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="password" />
                </div>
                <div>
                    <button type="button" onClick={() => onRouteChange('home')}>Register</button>
                </div>

            </form>
        </div>
    )
}

export default Register;