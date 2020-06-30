import React from 'react';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';
import store from './redux/store';
import Timeout from './TimeoutComponent';


export default class ScreenGrubGreeting extends React.Component {
  render() {
    let timeoutSeconds = store.getState().const.grubGreetingDuration;
    return <div className="screen-grub-greeting fill-screen">
      <Timeout timeoutSeconds={timeoutSeconds} onComplete={this.nextScreen} />
      <div className="message">Welcome to GRUB!</div>
    </div>
  }

  nextScreen = () => {
    setScreen(C.SCREEN_GRUB_MENU);
  }
}
