import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { setScreen } from './redux/actions';


class ScreenSuspend extends React.Component<Props> {
  render() {
    return <div className="screen-off fill-screen" onClick={this.wakeUp} onContextMenu={this.wakeUp}>
      <KeyboardEventHandler handleKeys={["all"]} handleFocusableElements
        onKeyEvent={this.wakeUp} />
    </div>
  }

  wakeUp = () => {
    setScreen(this.props.lastScreen);
  }
}

interface Props {
  lastScreen: string,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    lastScreen: state.suspend.lastScreen || "Error: suspend has no last screen set",
  };
};

const ReduxScreenSuspend = connect(mapStateToProps)(ScreenSuspend);
export default ReduxScreenSuspend;
