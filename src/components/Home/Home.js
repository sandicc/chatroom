import React from 'react';
import Navigation from '../Navigation/Navigation';
import ChatWindow from '../ChatWindow/ChatWindow';
import {CSSTransition} from 'react-transition-group';

const Home = ({onLogOut, sendMessage, messages, onlineUsers, route, timeout}) => {
    return(
        <CSSTransition unmountOnExit in={route === 'home'} classNames="fade" timeout={timeout}>
            <div className='absoluteState'>
                <Navigation route='home' onLogOut={onLogOut} />
                <ChatWindow  sendMessage={sendMessage} messages={messages} onlineUsers={onlineUsers}/>
            </div>
        </CSSTransition>
    );
}

export default Home;
