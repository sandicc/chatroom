import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Header from './components/Header/Header';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import ChatWindow from './components/ChatWindow/ChatWindow';
import io from 'socket.io-client';


class App extends React.Component {
  socket = '';
  host = 'localhost:3001';

  constructor() {
    super();
    this.state = {
      route: 'login',
      user: {
        username: '',
        password: ''
      },
      messages: [],
      onlineUsers : [],
      signedIn: false,
    };
    
  }

  renderPage(route) {
    switch (route) {
      case 'login':
        return <LogIn onRouteChange={this.onRouteChange}/>
      case 'register':
        return <Register onRouteChange={this.onRouteChange}/>
      case 'home':
        return <ChatWindow messages={this.state.messages} onlineUsers={this.state.onlineUsers}/>
      default:
        return <h1>Wrong route</h1>
    }
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({signedIn: true})
      this.socket = io(this.host, {secure: true});
      this.socket.emit('authentication','hello');
      this.socket.on('update', (data) => {
        this.setState({
          messages: this.state.messages.concat(data.messages),
          onlineUsers: data.onlineUsers
        });
      })
    }else{
      this.setState({signedIn: false});
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
