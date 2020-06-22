import React from 'react';
import StatusBar from './StatusBar';
import imageLoginBackground from '../img/background.jpg';


export default class ScreenLogin extends React.Component {
  render() {
    return <div>
      <img className="fill-screen" src={imageLoginBackground} alt=""></img>
      <div className="fill-screen">
        <StatusBar />
      </div>
    </div>
  }
}
