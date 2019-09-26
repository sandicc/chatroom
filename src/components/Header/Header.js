import React from 'react';
import './Header.css';
import '../../App.css';
import {CSSTransition} from 'react-transition-group';


const Header = ({route, onRouteChange, timeout}) => {
    return(
            <CSSTransition unmountOnExit in={route === 'entry'} classNames="fade" timeout={timeout}>
                <div className='centerParent absoluteState'>
                    <h1 onClick={() => onRouteChange('login')} className='entryH1 textShadow'>Angels chatroom</h1>
                </div>
            </CSSTransition>
    )
}

export default Header;