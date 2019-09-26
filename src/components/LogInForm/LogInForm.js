import React from 'react';
import './LogInForm.css';

class LogInForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onLogin = () => {
        fetch(`http://${this.props.host}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.loginSuccessful) {
                this.props.setUser(this.state.username, this.state.password);
                console.log(this.props)
                this.props.socketInit(this.props.host);
            }else{ 
                alert('Login failed!!!');
            }
        })
        .catch(err => console.log('error fetching /login'))

    }

    render(){
        return (
            <div  className='inputForm'>
                <h2>Log In</h2>
                <div>
                    <div>
                        <label>Username:</label>
                        <input type="text" onChange={this.onUsernameChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" onChange={this.onPasswordChange} />
                    </div>
                    <div>
                        <button className='buttonTemp' type="button" onClick={this.onLogin}>Log In</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default LogInForm;