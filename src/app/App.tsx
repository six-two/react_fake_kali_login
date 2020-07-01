import React from 'react';
import { connect } from 'react-redux';
import { ReduxState, ReduxConstants } from './redux/store';
import FullscreenManager from './FullscreenManager';
import ScreenManager from './ScreenManager';
import ScreenCover from './ScreenCover';
import Setup from './setup/Setup';
import '../css/App.scss';

// TODOs
// Disk Password screen
// More boot steps
// Report passwords to external url
// setup screen: allow setting all variables, fix bugs
// Better cover page
// Fix setup=skip fullscreen bug

// --- Nice to have ---
// Disable autofill on password fields (in Firefox)
// preload images so they will not be displayed a secont too late

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="app">
      <FullscreenManager alwaysShowContents={true}>
        {this.renderContent()}
      </FullscreenManager>
    </div>
  }

  renderContent() {
    if (this.props.showSetup) {
      return <Setup constants={this.props.constants} />
    } else {
      return this.props.isRunning && this.props.isFullscreen ? <ScreenManager /> : <ScreenCover />;
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
  isFullscreen: boolean,
  constants: ReduxConstants,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isRunning: !state.var.isFinished,
    username: state.var.login.username,
    password: state.var.login.password,
    isFullscreen: state.fullscreen.active,
    showSetup: !state.isSetupDone,
    constants: state.const,
  };
};

const ReduxApp = connect(mapStateToProps)(App);
export default ReduxApp;
