import React from 'react';
import StatusBar from './StatusBar';
import { setLoginOpenMenu } from './redux/actions';
import imageLoginBackground from '../img/background.jpg';


export default class ScreenLogin extends React.Component {
  render() {
    return <div className="screen-login">
      <img className="fill-screen" src={imageLoginBackground} alt=""></img>
      <div className="fill-screen v-flex" onClick={() => setLoginOpenMenu()}>
        <StatusBar />
        <div className="expand"></div>
        {this.props.children}
        <div className="expand"></div>
      </div>
    </div>
  }
}
