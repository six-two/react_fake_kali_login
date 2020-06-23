import React from 'react';
import { connect } from 'react-redux';
import {
  setScreen, setGrubMainSelectedIndex, setKernelAndBoot
} from './redux/actions';
import * as C from './redux/constants';
import { ReduxState } from './redux/store';
import ScreenGrub from './ScreenGrub';

const DO_NOTHING = () => { };

const ADVANCED_OPTIONS = {
  title: "Advanced options for Kali GNU/Linux",
  onSelected: () => {
    setScreen(C.SCREEN_GRUB_ADVANCED);
  },
};

const SYSTEM_SETUP = {
  title: "System setup",
  onSelected: () => {
    alert("How am I supposed to emulate this?\n" +
      "I will probably just show you an error or do a normal reboot!");
  },
};


class ScreenGrubMain extends React.Component<Props> {
  render() {
    let startNormal = {
      title: "Kali GNU/Linux",
      onSelected: () => {
        setKernelAndBoot(this.props.defaultKernel);
      },
    };
    const entries = [startNormal, ADVANCED_OPTIONS, SYSTEM_SETUP];
    let timeout = this.props.showTimeout ? this.props.timeout : undefined;
    return <ScreenGrub
      entries={entries}
      onBack={DO_NOTHING}
      selected={this.props.selected}
      setSelectedIndex={setGrubMainSelectedIndex}
      timeout={timeout}
      lastScreenChange={this.props.lastScreenChange} />
  }
}

interface Props {
  selected: number,
  defaultKernel: string,
  lastScreenChange: Date,
  timeout: number,
  showTimeout: boolean,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    selected: state.boot.selectedMain,
    defaultKernel: state.boot.kernel.default,
    lastScreenChange: state.screen.changeTime,
    timeout: state.boot.timeout,
    showTimeout: state.boot.showTimeout,
  };
};

const ReduxScreenGrubMain = connect(mapStateToProps)(ScreenGrubMain);
export default ReduxScreenGrubMain;