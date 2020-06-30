import React from 'react';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';
import store, { ReduxState } from './redux/store';
import Timeout from './TimeoutComponent';
import imagePlymountBackground from '../img/decrypt.jpg';

// TODO base it on /usr/share/plymouth/themes/kali/
export default class ScreenPlymouthBoot extends React.Component<Props> {
  render() {
    let timeout = store.getState().const.plymountDuration;
    return <div className="screen-plymouth-boot">
      <Timeout timeoutSeconds={timeout} onComplete={this.nextScreen} />
      <img className="fill-screen" src={imagePlymountBackground} alt="" />
    </div>
  }

  nextScreen = () => {
    setScreen(C.SCREEN_LOGIN);
  }
}

interface Props {
}
