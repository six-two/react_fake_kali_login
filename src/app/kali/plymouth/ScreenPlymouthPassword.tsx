import React from 'react';
import { connect } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { setScreen, setDecryptPassword } from '../../redux/actions';
import * as C from '../../redux/constants';
import { ReduxState } from '../../redux/store';
import { PlymouthLogoPassword } from './PlymouthBootAnimation';
import iconKey from '../../../img/plymouth/key.png';


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
          Please unlock disk {this.props.cryptDevice}
        </div>
      </div>
    </div>
  }

  onPasswordChange = (event: any) => {
    setDecryptPassword(event.target.value);
  }

  onDecrypt = () => {
    setScreen(C.SCREEN_PLYMOUTH_CHECK_PASSWORD);
  }
}

interface Props {
  cryptDevice: string,
  password: string,
  reduxState: ReduxState,
}

interface State {
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    cryptDevice: state.const.cryptDevice || "<ERROR: No crypt device found>",
    password: state.var.decrypt.password,
    reduxState: state,
  };
};

const ReduxScreenPlymouthPassword = connect(mapStateToProps)(ScreenPlymouthPassword);
export default ReduxScreenPlymouthPassword;
