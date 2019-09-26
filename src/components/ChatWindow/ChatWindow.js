import React from 'react';
import './ChatWindow.css';
import OutputField from '../OutputField/OutputField';


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
        if((event.which || event.keyCode) === 13 && this.state.input.length){
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
                    <ul ref={this.ul} className="usersField">
                        {this.onlineUsersRender(this.props.onlineUsers)}
                    </ul>
                </div>
                <div className="chatBox">
                    <OutputField messages={this.props.messages} className="outputField" />
                    <div className="inputRow">
                        <input onKeyUp={this.onKeyUp} type="text" placeholder="enter text"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatWindow;