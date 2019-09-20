import React from 'react';
import './ChatWindow.css';


class ChatWindow extends React.Component {
    constructor(){
        super();
        this.state = {
            input: ''
        }
    }

    onKeyUp = (event) => {
        console.log(event.target.value);
        // check if pressed key is enter
        if((event.which || event.keyCode) === 13){
            event.target.value = '';
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
                    <ul className="outputField">
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