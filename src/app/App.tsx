import React from 'react';
import { connect } from 'react-redux';
import { ReduxState, ReduxConstants } from './redux/store';
import * as C from './redux/constants';
import FullscreenManager from './FullscreenManager';
import ScreenManager from './ScreenManager';
import Setup from './setup/Setup';
import '../css/App.scss';

// TODOs
// Disk Password screen
// More boot steps
// Report passwords to external url
// setup screen: allow setting all variables, fix bugs
// Better cover page

// --- Nice to have ---
// Disable autofill on password fields (in Firefox)
// preload images so they will not be displayed a secont too late

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.showSetup) {
      return <div className="app">
        <Setup constants={this.props.constants} />
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
  constants: ReduxConstants,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isRunning: !state.var.isFinished,
    username: state.var.login.username,
    password: state.var.login.password,
    showSetup: !state.isSetupDone,
    constants: state.const,
  };
};

const ReduxApp = connect(mapStateToProps)(App);
export default ReduxApp;
