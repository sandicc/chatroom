import React from 'react';
import Navigation from "../Navigation/Navigation";
import LogInForm from "../LogInForm/LogInForm";
import {CSSTransition} from 'react-transition-group';

const LogIn = ({onRouteChange, host, socketInit, setUser, route, timeout, errorMSG, setErrorMSG}) => {
    return(
        <CSSTransition unmountOnExit in={route === 'login'} classNames="fade" timeout={timeout}>
            <div className='absoluteState'>
                <Navigation route='login' onRouteChange={onRouteChange}/>
                <LogInForm errorMSG={errorMSG} setErrorMSG={setErrorMSG} host={host} socketInit={socketInit} setUser={setUser} onRouteChange={onRouteChange}/>
            </div>
        </CSSTransition>
    );
}

export default LogIn;
