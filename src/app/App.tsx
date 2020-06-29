import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import * as C from './redux/constants';
import FullscreenManager from './FullscreenManager';
import ScreenManager from './ScreenManager';
import Setup from './setup/ScreenSetup';
import '../css/App.scss';

// TODOs
// Disk Password screen
// More boot steps
// Report passwords to external url
// setup screen: allow setting all variables
// Better cover page

// --- Nice to have ---
// Disable autofill on password fields (in Firefox)

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.showSetup) {
      return <div className="app">
        <Setup />
      </div>
    } else {
      return <div className="app">
        <h1>Nothing to see here</h1>
        <p>To start the fake kali login press the following key combination: <code>Ctrl+Space</code>.
        This will open up the fake login screen in fullscreen mode.
      To go back here / exit the simulation just press the <code>Escape</code> key.
                    If you have finished the simulation and want to start it again
       just reload the page (you can press <code>F5</code> to do that) and press <code>Ctrl+Space</code> again.</p>
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
}

interface State {
}

interface Props {
  isRunning: boolean,
  username: string,
  password: string,
  showSetup: boolean,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isRunning: !state.var.isFinished,
    username: state.var.login.username,
    password: state.var.login.password,
    showSetup: !state.isSetupDone,
  };
};

const ReduxApp = connect(mapStateToProps)(App);
export default ReduxApp;
