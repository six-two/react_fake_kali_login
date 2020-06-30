import React from 'react';
import { connect } from 'react-redux';
import { setScreen, resetState } from './redux/actions';
import * as C from './redux/constants';
import { ReduxState } from './redux/store';
import Timeout from './TimeoutComponent';
import imagePlymountBackground from '../img/decrypt.jpg';

// TODO base it on /usr/share/plymouth/themes/kali/
class ScreenShutdown extends React.Component<Props> {
  render() {
    return <div className="screen-plymouth-shutdown">
      <Timeout timeoutSeconds={this.props.duration} onComplete={this.nextScreen} />
      <img className="fill-screen" src={imagePlymountBackground} alt="" />
    </div>
  }

  nextScreen = () => {
    if (this.props.reboot) {
      resetState();
    } else {
      setScreen(C.SCREEN_OFF);
    }
  }
}

interface Props {
  duration: number,
  reboot: boolean,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    duration: state.const.shutdownDuration,
    reboot: state.var.rebootAfterShutdown,
  };
};

const ReduxScreenShutdown = connect(mapStateToProps)(ScreenShutdown);
export default ReduxScreenShutdown;
