import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { setLoginUsername, setLoginPassword, tryLogin } from './redux/actions';
import { ReduxState } from './redux/store';
import { isLoginValid } from './VerifyCredentials';
import imageUser from '../img/user.png';


function focus(ref: React.RefObject<unknown>) {
  ref.current && (ref.current as any).focus();
}

class LoginDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      passwordRef: React.createRef(),
    }
  }

  render() {
    return <div className="login-box">
      <div className="user-details h-flex">
        <img className="user-icon" alt="" src={imageUser} />
        <div className="inputs expand">
          <KeyboardEventHandler
            handleKeys={["enter"]}
            onKeyEvent={this.focusPassword}>
            <input
              type="text"
              value={this.props.username}
              placeholder="Enter your username"
              onChange={this.onUsernameChange}
              autoFocus
              autoComplete="off" />
          </KeyboardEventHandler>
          <KeyboardEventHandler
            handleKeys={["enter"]}
            onKeyEvent={this.onLogin}>
            <input
              type="password"
              ref={this.state.passwordRef}
              value={this.props.password}
              placeholder="Enter your password"
              onChange={this.onPasswordChange}
              autoComplete="new-password" />
          </KeyboardEventHandler>
        </div>
      </div>
      {this.props.showLoginError && (
        <div className="wrong-password">
          Incorrect password, please try again
        </div>)
      }
      <div className="buttons h-flex">
        <button type="button" className="cancel" onClick={this.onCancel}>Cancel</button>
        <div className="expand"></div>
        <button type="button" className="login" onClick={this.onLogin}>Log In</button>
      </div>
    </div>
  }

  onUsernameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLoginUsername(evt.target.value);
  }

  onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(evt.target.value);
  }

  onLogin = () => {
    isLoginValid(this.props.reduxState).then(isValid => tryLogin(isValid));
  }

  onCancel = () => {
    setLoginPassword("");
  }

  focusPassword = () => {
    focus(this.state.passwordRef);
  }
}

interface Props {
  username: string,
  password: string,
  showLoginError: boolean,
  reduxState: ReduxState,
}

interface State {
  passwordRef: React.RefObject<HTMLInputElement>,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    username: state.var.login.username,
    password: state.var.login.password,
    showLoginError: state.var.login.failed,
    reduxState: state,
  };
};

const ReduxLoginDialog = connect(mapStateToProps)(LoginDialog);
export default ReduxLoginDialog;
