import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Header from './components/Header/Header';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import ChatWindow from './components/ChatWindow/ChatWindow';
import io from 'socket.io-client';

const initialState = {
  route: 'login',
  messages: [],
  onlineUsers : [],
  signedIn: false,
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
        return <LogIn host={this.host} setUser={this.setUser} onRouteChange={this.onRouteChange}/>
      case 'register':
        return <Register host={this.host} setUser={this.setUser} onRouteChange={this.onRouteChange}/>
      case 'home':
        return <ChatWindow  messages={this.state.messages} onlineUsers={this.state.onlineUsers}/>
      default:
        return <h1>Wrong route</h1>
    }
  }

  socketInit = (dest) => {
    if(this.socket !== null) return this.socket;
    const socket = io(this.host, {secure: true});
    socket.on('connect', () => {
      this.setState({
        signedIn: true,
        route: 'home'
      })
      socket.emit('authentication', {username: this.user.username, password: this.user.password});
    });
    
    socket.on('update', (data) => {
      this.setState({
        signedIn: true,
        messages: [...this.state.messages, ...data.messages],
        onlineUsers: data.onlineUsers
      });
    })

    return socket;
  }

  setUser = (username,password) => {
    this.user = {
      username: username,
      password: password
    }
  }

  onRouteChange = (route) => {
    switch(route){
      case 'home':
        this.socket = this.socketInit(this.host);
        break;

      case 'login':
        if(this.state.route === 'home'){
          this.socket.close();
          this.socket = null;
          this.setState(initialState);
          this.user = {
            username: '',
            password: ''
          }
        }
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
        <Navigation onRouteChange={this.onRouteChange} signedIn={this.state.signedIn}/>
        <Header/>
        {this.renderPage(this.state.route)}
      </div>
    )
  }
}

export default App;
