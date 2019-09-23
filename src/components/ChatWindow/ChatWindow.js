import React from 'react';
import './ChatWindow.css';


class ChatWindow extends React.Component {
    constructor(){
        super();
        this.state = {
            input: ''
        }
        this.ul = React.createRef();
    }

    onKeyUp = (event) => {
        // check if pressed key is enter
        if((event.which || event.keyCode) === 13){
            this.props.sendMessage(this.state.input);
            event.target.value = '';
            this.setState({input: ''});
        }else{
            this.setState({input: event.target.value});
        }
    
    }

    messageRender = (messages) => {
        return messages.map((element) => {
            return <li key={element.id}>{element.username}: {element.message}</li>
        })
    }

    onlineUsersRender = (onlineUsers) => {
        return onlineUsers.map((element) => {
            return <li key={element.id}>{element.username}</li>
        })
    }

    render() {
        return (
            <div className="chat">
                <div className="usersContainer">
                    <p>Online</p>
                    <ul ref={this.ul} className="outputField">
                        {this.onlineUsersRender(this.props.onlineUsers)}
                    </ul>
                </div>
                <div className="chatBox">
                    <ul className="outputField">
                        {this.messageRender(this.props.messages)}
                    </ul>
                    <div className="inputRow">
                        <input onKeyUp={this.onKeyUp} type="text" placeholder="enter text"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatWindow;