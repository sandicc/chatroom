import React from 'react';
import Navigation from "../Navigation/Navigation";
import RegisterForm from "../RegisterForm/RegisterForm";
import {CSSTransition} from 'react-transition-group';

const Register = ({route, onRouteChange, host, socketInit, setUser, timeout, errorMSG, setErrorMSG}) => {
    return(
        <CSSTransition unmountOnExit in={route === 'register'} classNames="fade" timeout={timeout}>
            <div className='absoluteState'>
                <Navigation route='register' onRouteChange={onRouteChange}/>
                <RegisterForm errorMSG={errorMSG} setErrorMSG={setErrorMSG} host={host} socketInit={socketInit} setUser={setUser} onRouteChange={onRouteChange}/>
            </div>
        </CSSTransition>
    );
}

export default Register;
