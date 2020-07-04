import React from 'react';
import { connect } from 'react-redux';
import { setScreen } from '../../redux/actions';
import * as C from '../../redux/constants';
import { ReduxState } from '../../redux/store';
import Timeout from '../../TimeoutComponent';


class ScreenConsoleBooting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showInitrdLine: false };
  }

  render() {
    return <div className="screen-console-boot fill-screen">
      <Timeout timeoutSeconds={this.props.durationKernel}
        onComplete={this.kernelFinished} />
      <Timeout timeoutSeconds={this.props.durationInitrd}
        onComplete={this.initrdFinished} />
      <div className="boot-entry-name">Booting `{this.props.bootEntry}'</div>
      <div>Loading Linux {this.props.kernel} ...</div>
      {this.state.showInitrdLine && <div>Loading initial ramdisk ...</div>}
    </div>
  }

  kernelFinished = () => {
    this.setState({ showInitrdLine: true });
  }

  initrdFinished = () => {
    setScreen(C.SCREEN_PLYMOUTH_PASSWORD);
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
    durationInitrd: state.const.initrdLoadDuration + state.const.kernelLoadDuration,
    bootEntry: state.var.grub.selectedEntryName,
    kernel: state.var.grub.kernel,
  };
};

const ReduxScreenConsoleBooting = connect(mapStateToProps)(ScreenConsoleBooting);
export default ReduxScreenConsoleBooting;
