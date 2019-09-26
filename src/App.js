import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import LogIn from './components/LogIn/LogIn';
import io from 'socket.io-client';
import Cloud from './components/Cloud/Cloud';
import Home from './components/Home/Home';
import Register from './components/Register/Register';

const initialState = {
  messages: [],
  onlineUsers : [],
};

class App extends React.Component {
  socket = null;
  timeout = 500;
  host = '192.168.100.198:3002';
  user = {
    username: '',
    password: ''
  }

  constructor() {
    super();
    this.state = {...initialState, route: 'entry', errorMSG: '',};
  }

  renderPage(route) {
    switch (route) {
      case 'login':
        return <LogIn errorMSG={this.state.errorMSG} host={this.host} socketInit={this.socketInit} setUser={this.setUser} onRouteChange={this.onRouteChange}/>
      case 'register':
        return <Register errorMSG={this.state.errorMSG} host={this.host} socketInit={this.socketInit} setUser={this.setUser} onRouteChange={this.onRouteChange}/>
      case 'home':
        return <Home route={this.state.route} onLogOut={this.onLogOut} sendMessage={this.sendMessage} messages={this.state.messages} onlineUsers={this.state.onlineUsers}/>
      case 'entry':
        break;
      default:
        return <h1>Wrong route</h1>
    }
  }

  sendMessage = (message) => {
    this.socket.emit('message', {message:message});
    console.log(message)
  }

  socketInit = (dest) => {
    if(this.socket !== null) return;
    const socket = io(dest, {secure: true});
    socket.on('connect', () => {
      socket.emit('authentication', {username: this.user.username, password: this.user.password});
    });
    
    socket.on('update', (data) => {
      if(data.messages.length &&
      this.state.messages.length &&
      data.messages[0].id === this.state.messages[this.state.messages.length - 1].id){
        data.messages.shift();
      }
      this.setState({
        messages: [...this.state.messages, ...data.messages],
        onlineUsers: data.onlineUsers
      });
    })

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        console.log(reason);
        this.setState({errorMSG:'⚠️User already connected!!!'});
        this.onLogOut();
      }
    })

    socket.on('authentication', ({auth}) => {
      console.log('entry')
      if(auth) this.onRouteChange('home');
    })

    this.socket = socket;
  }

  setUser = (username,password) => {
    this.user = {
      username: username,
      password: password
    }
  }

  setErrorMSG = (error) => {
    this.setState({errorMSG: error});
  }

  onLogOut = () => {
    this.socket.close();
    this.socket = null;
    this.setState(initialState);
    this.setState({route: 'login'})
    this.user = {
      username: '',
      password: ''
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route,
                  errorMSG: ''});
  }

  render () {
    return (
      <div className="App textShadow">
        <Cloud count={10}/>
        <Header timeout={this.timeout} onRouteChange={this.onRouteChange} route={this.state.route}/>
        <LogIn errorMSG={this.state.errorMSG} setErrorMSG={this.setErrorMSG} timeout={this.timeout} route={this.state.route} host={this.host} socketInit={this.socketInit} setUser={this.setUser} onRouteChange={this.onRouteChange}/>
        <Register errorMSG={this.state.errorMSG} setErrorMSG={this.setErrorMSG} timeout={this.timeout} route={this.state.route} host={this.host} socketInit={this.socketInit} setUser={this.setUser} onRouteChange={this.onRouteChange}/>
        <Home timeout={this.timeout} route={this.state.route} onLogOut={this.onLogOut} sendMessage={this.sendMessage} messages={this.state.messages} onlineUsers={this.state.onlineUsers}/>
      </div>
    )
  }
}

export default App;
