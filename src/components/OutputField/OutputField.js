import React from 'react';
import autoscroll from 'autoscroll-react';


class OutputField extends React.Component {
    messageRender = (messages) => {
        return messages.map((element) => {
            return <li key={element.id}>{element.username}: {element.message}</li>
        })
    }

    render(){
        return (
            <ul className="outputField">
                {this.messageRender(this.props.messages)}
            </ul>
        )
    }
}

export default autoscroll(OutputField);