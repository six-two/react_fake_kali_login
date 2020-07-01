import React from 'react';
import { connect } from 'react-redux';
import { setScreen, resetState } from './redux/actions';
import * as C from './redux/constants';
import { ReduxState } from './redux/store';
import { PlymouthLogoShutdown } from './PlymouthBootAnimation';
import Timeout from './TimeoutComponent';


class ScreenShutdown extends React.Component<Props> {
  render() {
    return <div className="screen-plymouth-shutdown plymouth v-flex">
      <div className="expand"></div>
      <PlymouthLogoShutdown />
      <Timeout timeoutSeconds={this.props.duration} onComplete={this.nextScreen} />
      <div className="expand"></div>
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
