import React from 'react';
import autoscroll from 'autoscroll-react';
import arrow from './arrow.png';
import { CSSTransition } from 'react-transition-group';


class OutputField extends React.Component {
    constructor() {
        super();
        this.showArrow = false;
        this.timeout = 200;
        this.scroll = false;
        this.userScroll = false;
        this.messagesOld = [];
        this.Out = React.createRef();
    }
    
    
    messageRender = (messages) => {
        if(this.Out.current !== null) console.log(this.Out.current.scrollHeight -this.Out.current.scrollTop, this.Out.current.offsetHeight);
        if(messages.length - this.messagesOld.length) this.scroll = true;
        this.messagesOld = messages;
        return messages.map((element) => {
            return <li key={element.id}>{element.username}: {element.message}</li>;
        });
    }

    render(){
        return (
            <div className='outContainer'>
                <ul ref={this.Out} className="outputField">
                    {this.messageRender(this.props.messages)}
                </ul>
                <CSSTransition unmountOnExit in={this.showArrow} classNames="fadeHide" timeout={this.timeout}>
                    <img className='arrow' onClick={this.scrollToBottom} alt='' src={arrow}/>
                </CSSTransition>
            </div>
        );
    }

    scrollToBottom = () => {
        this.Out.current.scrollTo(0, this.Out.current.scrollHeight);
    }

    componentDidUpdate() {
        if(this.didRender) this.didRender = true;
        if(this.scroll && !this.userScroll) {
            this.scrollToBottom();
            this.scroll = false;
        }
        if((this.Out.current.scrollHeight - this.Out.current.scrollTop) === this.Out.current.offsetHeight){
            this.userScroll = false;
            this.showArrow = false;
        }else{
            this.showArrow = true;
            this.userScroll = true
        }
    }
}

export default OutputField;