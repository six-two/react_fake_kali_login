import React from 'react';
import StatusBar from './StatusBar';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';
import imageLoginBackground from '../img/background.jpg';


export default class ScreenLogin extends React.Component {
  render() {
    return <div>
      <img className="fill-screen" src={imageLoginBackground} alt=""></img>
      <div className="fill-screen">
        <StatusBar />
        <button onClick={this.screenOff}>Test: screen off</button>
      </div>
    </div>
  }

  screenOff = () => {
    setScreen(C.SCREEN_SUSPEND);
  }
}
