import React from 'react';
import StatusBar from './StatusBar';
import store from './redux/store';
import { setScreen, SCREEN_OFF } from './redux/actions';

export default class ScreenLogin extends React.Component {
  render() {
    return <div className="fill-screen">
      <StatusBar />
      <button onClick={this.screenOff}>Test: screen off</button>
    </div>
  }

  screenOff = () => {
    store.dispatch(setScreen(SCREEN_OFF));
  }
}
