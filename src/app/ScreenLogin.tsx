import React from 'react';
import StatusBar from './StatusBar';
import LoginDialog from './LoginDialog';
import imageLoginBackground from '../img/background.jpg';


export default class ScreenLogin extends React.Component {
  render() {
    return <div className="screen-login">
      <img className="fill-screen" src={imageLoginBackground} alt=""></img>
      <div className="fill-screen v-flex">
        <StatusBar />
        <div className="expand"></div>
        <LoginDialog />
        <div className="expand"></div>
      </div>
    </div>
  }
}
