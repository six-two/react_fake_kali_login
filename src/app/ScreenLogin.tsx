import React from 'react';
import StatusBar from './StatusBar';
import store from './redux/store';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';


export default class ScreenLogin extends React.Component {
  render() {
    return <div className="fill-screen">
      <StatusBar />
      <button onClick={this.screenOff}>Test: screen off</button>
    </div>
  }

  screenOff = () => {
    setScreen(C.SCREEN_SUSPEND);
  }
}
