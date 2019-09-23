import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Header from './components/Header/Header';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import ChatWindow from './components/ChatWindow/ChatWindow';
import io from 'socket.io-client';

const initialState = {
  route: 'entry',
  messages: [],
  onlineUsers : [],
};

class App extends React.Component {
  socket = null;
  host = 'localhost:3002';
  user = {
    username: '',
    password: ''
  }

  constructor() {
    super();
    this.state = initialState;
    
  }

  renderPage(route) {
    switch (route) {
      case 'login':
        return <LogIn host={this.host} socketInit={this.socketInit} setUser={this.setUser} onRouteChange={this.onRouteChange}/>
      case 'register':
        return <Register host={this.host} socketInit={this.socketInit} setUser={this.setUser} onRouteChange={this.onRouteChange}/>
      case 'home':
        return <ChatWindow  sendMessage={this.sendMessage} messages={this.state.messages} onlineUsers={this.state.onlineUsers}/>
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

  onLogOut = () => {
    this.socket.close();
    this.socket = null;
    this.setState(initialState);
    this.setState({route: 'login'});
    this.user = {
      username: '',
      password: ''
    }
    this.onRouteChange('login');
  }

  onRouteChange = (route) => {
    switch(route){
      case 'home':
        // this.socketInit(this.host);
        break;

      case 'login':
        break;

      case 'register':
        break;
        
      default:
        console.log("bad route");
      }
      this.setState({route: route});
  }

  render () {
    return (
      <div className="App">
        <div id="background"></div>
        {this.state.route !== 'entry' 
          ? <Navigation onRouteChange={this.onRouteChange} route={this.state.route} onLogOut={this.onLogOut}/> 
          : null}
        <Header onRouteChange={this.onRouteChange} route={this.state.route}/>
        {this.renderPage(this.state.route)}
      </div>
    )
  }
}

export default App;
