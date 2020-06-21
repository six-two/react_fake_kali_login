import React from 'react';
// import ResizeObserver from "resize-observer-polyfill";
import StatusBar from './StatusBar';
import store from './redux/store';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';
// import { useHover, ToggleLayer } from "react-laag";
import imageLoginBackground from '../img/background.jpg';


export default class ScreenLogin extends React.Component {
  render() {
    return <div>
      <img className="fill-screen" src={imageLoginBackground}></img>
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
