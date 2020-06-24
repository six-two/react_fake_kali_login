import React from 'react';
import { connect } from 'react-redux';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';
import { ReduxState } from './redux/store';

// TODO base it on /usr/share/plymouth/themes/kali/
class ScreenConsoleBooting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showInitrdLine: false };
  }

  componentDidMount() {
    let durationInMs = Math.round(this.props.durationKernel * 1000);
    setTimeout(() => this.setState({ showInitrdLine: true }), durationInMs);
    durationInMs += Math.round(this.props.durationInitrd * 1000);
    setTimeout(() => setScreen(C.SCREEN_PLYMOUTH_PASSWORD), durationInMs);
  }

  render() {
    return <div className="screen-console-boot fill-screen">
      <div className="boot-entry-name">Booting `{this.props.bootEntry}'</div>
      <div>Loading Linux {this.props.kernel} ...</div>
      {this.state.showInitrdLine && <div>Loading initial ramdisk ...</div>}
    </div>
  }
}

interface Props {
  durationKernel: number,
  durationInitrd: number,
  bootEntry: string,
  kernel: string,
}

interface State {
  showInitrdLine: boolean,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    durationKernel: state.const.kernelLoadDuration,
    durationInitrd: state.const.initrdLoadDuration,
    bootEntry: state.var.grub.selectedEntryName,
    kernel: state.var.grub.kernel,
  };
};

const ReduxScreenConsoleBooting = connect(mapStateToProps)(ScreenConsoleBooting);
export default ReduxScreenConsoleBooting;
