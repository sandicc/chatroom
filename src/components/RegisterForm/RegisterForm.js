import React from 'react';
import './RegisterForm.css';

class RegisterForm extends React.Component {

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
            if(data.insertSuccessful) {
                this.props.setUser(this.state.username, this.state.password);
                this.props.socketInit(this.props.host);
            }else{ 
                alert('Register failed!!!');
            }
        })
        .catch(err => console.log('error fetching /register'))


    }

    render() {
        return (
            <div className='inputForm'>
                <h2>Register</h2>
                <form>
                    <div>
                        <label>Username:</label>
                        <input type="text" onChange={this.onUsernameChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" onChange={this.onEmailChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" onChange={this.onPasswordChange} />
                    </div>
                    <div>
                        <button  className='buttonTemp' type="button" onClick={this.onRegister}>Register</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default RegisterForm;