import React from 'react';
import './LogIn.css';

const LogIn = ({onRouteChange}) => {
    return (
        <div className="loginContainer">
            <h2>Log In</h2>
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" placeholder="username" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="password" />
                </div>
                <div>
                    <button type="button" onClick={() => onRouteChange('home')}>Log In</button>
                </div>

            </form>
        </div>
    )
}

export default LogIn;