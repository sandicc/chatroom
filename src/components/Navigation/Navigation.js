import React from 'react';
import './Navigation.css';


const Navigation = ({onRouteChange, signedIn}) => {
    if(!signedIn){
        return (
            <ul className="navContainer">
                <li onClick={() => onRouteChange('login')}>Log In</li>
                <li onClick={() => onRouteChange('register')}>Register</li>
            </ul>
        );
    }
    else{
        return (
            <ul className="navContainer">
                <li onClick={() => onRouteChange('login')}>Log Out</li>
            </ul>
        );
    }
}

export default Navigation;