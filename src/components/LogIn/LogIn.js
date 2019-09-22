import React from 'react';
import './LogIn.css';

class LogIn extends React.Component {

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
                this.props.onRouteChange('home');
            }else{ 
                alert('Login failed!!!');
            }
        })
        .catch(err => console.log('error fetching /login'))

    }

    render(){
        return (
            <div className="loginContainer">
                <h2>Log In</h2>
                <form>
                    <div>
                        <label>Username:</label>
                        <input type="text" onChange={this.onUsernameChange} placeholder="username" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" onChange={this.onPasswordChange} placeholder="password" />
                    </div>
                    <div>
                        <button type="button" onClick={this.onLogin}>Log In</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default LogIn;