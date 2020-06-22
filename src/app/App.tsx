import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import FullscreenManager from './FullscreenManager';
import ScreenManager from './ScreenManager';
import '../css/App.scss';

// TODOs
// Update github projects page
// Diasble autofill on password fields

// --- Nice to have ---

const DEBUG = true;


class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="App">
      <h1>Nothing to see here</h1>
      {this.props.isRunning && (
        <FullscreenManager alwaysShowContents={DEBUG}>
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
    isRunning: !state.isFinished,
    username: state.login.username,
    password: state.login.password,
  };
};

const ReduxApp = connect(mapStateToProps)(App);
export default ReduxApp;
