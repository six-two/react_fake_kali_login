import React from 'react';
import { connect } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { tryDecrypt, setDecryptPassword } from './redux/actions';
import * as C from './redux/constants';
import store, { ReduxState } from './redux/store';
import { isDecryptPasswordValid } from './VerifyCredentials';
import { PlymouthLogoPassword } from './PlymouthBootAnimation';
import iconKey from '../img/plymouth/key.png';

//TODO hide field on enter, on error show message for one sec, then retry
class ScreenPlymouthPassword extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="screen-plymouth-decrypt plymouth v-flex">
      <div className="expand"></div>
      <PlymouthLogoPassword />
      <div className="expand">
        <div className="password-div">
          <img src={iconKey} alt="key" />

          <KeyboardEventHandler
            handleKeys={["enter"]}
            onKeyEvent={this.onDecrypt}>
            <input
              type="password"
              value={this.props.password}
              placeholder=""
              onChange={this.onPasswordChange}
              autoFocus
              autoComplete="off" />
          </KeyboardEventHandler>
          <br />

        </div>
        <div className="status-text">
          {this.props.failed ?
            `cryptsetup: ERROR: ${this.props.cryptDevice}: cryptsetup failed, bad password or options?` :
            `Please unlock disk ${this.props.cryptDevice}`
          }
        </div>
      </div>
    </div>
  }

  onPasswordChange = (event: any) => {
    setDecryptPassword(event.target.value);
  }

  onDecrypt = () => {
    isDecryptPasswordValid(this.props.reduxState).then(isValid => tryDecrypt(isValid));
  }
}

interface Props {
  cryptDevice: string,
  password: string,
  failed: boolean,
  reduxState: ReduxState,
}

interface State {
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    cryptDevice: state.const.cryptDevice || "<ERROR: No crypt device found>",
    password: state.var.decrypt.password,
    failed: state.var.decrypt.failed,
    reduxState: state,
  };
};

const ReduxScreenPlymouthPassword = connect(mapStateToProps)(ScreenPlymouthPassword);
export default ReduxScreenPlymouthPassword;
