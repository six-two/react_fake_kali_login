import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import * as C from './redux/constants';
import FullscreenManager from './FullscreenManager';
import ScreenManager from './ScreenManager';
import '../css/App.scss';

// TODOs
// Disable autofill on password fields (in Firefox)
// Allow setting consts through url params
// Disk Password screen
// More boot steps

// --- Nice to have ---


class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="app">
      <h1>Nothing to see here</h1>
      {this.props.isRunning && (
        <FullscreenManager alwaysShowContents={C.DEBUG}>
          <ScreenManager />
        </FullscreenManager>
      )}
      { //Idea: maybe put something like a ransom message here.
        !this.props.isRunning && `Public service announcement:\nDo not use a weak password like "qwerty", "12345678", "monkey123", "${this.props.password}", or "iloveyou2"!`
    }
    </div>
  }
}

interface State {
}

interface Props {
  isRunning: boolean,
  username: string,
  password: string,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isRunning: !state.var.isFinished,
    username: state.var.login.username,
    password: state.var.login.password,
  };
};

const ReduxApp = connect(mapStateToProps)(App);
export default ReduxApp;
