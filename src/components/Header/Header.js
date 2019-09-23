import React from 'react';
import './Header.css';


const Header = ({route, onRouteChange}) => {
    return(
        route === 'entry'
            ?  <div className='centerParent'><h1 onClick={() => onRouteChange('login')} className='entryH1'>Angel's chatroom</h1></div>
            : <h1 className='normalH1'>Angel's chatroom</h1>
    )
}

export default Header;