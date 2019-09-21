import React from 'react';
import './Register.css';

class Register extends React.Component {

    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onRegister = () => {
        fetch(`http://${this.props.host}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
        .then(data => {
            if(data.insertSuccesful){
                this.props.onRouteChange('home');
            }else{
                alert('Username/email already used!!!');
            }
        })
        .catch(err => console.log('error fetching /register'))


    }

    render() {
        return (
            <div className="registerContainer">
                <h2>Register</h2>
                <form>
                    <div>
                        <label>Username:</label>
                        <input type="text" onChange={this.onUsernameChange} placeholder="username" />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" onChange={this.onEmailChange} placeholder="email" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" onChange={this.onPasswordChange} placeholder="password" />
                    </div>
                    <div>
                        <button type="button" onClick={this.onRegister}>Register</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default Register;