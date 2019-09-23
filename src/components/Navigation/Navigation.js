import React from 'react';
import './Navigation.css';


const Navigation = ({onRouteChange, route, onLogOut}) => {
    if(route === 'home'){
        return (
            <ul className="navContainer">
                <li onClick={onLogOut}>Log Out</li>
            </ul>
        );
    }
    else{
        return (
            <ul className="navContainer">
                <li onClick={() => onRouteChange('login')}>Log In</li>
                <li onClick={() => onRouteChange('register')}>Register</li>
            </ul>
        );
    }
}

export default Navigation;