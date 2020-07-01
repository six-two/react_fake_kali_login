import React from 'react';
import { connect } from 'react-redux';
import { tryDecrypt } from './redux/actions';
import { ReduxState } from './redux/store';
import { isDecryptPasswordValid } from './VerifyCredentials';
import { PlymouthLogoPassword } from './PlymouthBootAnimation';
import Timeout from './TimeoutComponent';


class ScreenPlymouthCheckingPassword extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { decryptSuccessful: null };
  }

  componentDidMount() {
    isDecryptPasswordValid(this.props.reduxState).then(isValid => {
      //TODO make this execute in almost constant time (independent of server response time)
      this.setState({ decryptSuccessful: isValid });
    });
  }

  render() {
    return <div className="screen-plymouth-check plymouth v-flex">
      <div className="expand"></div>
      <PlymouthLogoPassword />
      <div className="expand">
        <div className="status-text">
          {this.renderStatusLine()}
        </div>
      </div>
    </div>
  }

  renderStatusLine() {
    if (this.state.decryptSuccessful === null) {
      return `Please unlock disk ${this.props.cryptDevice}`;
    } else {
      let text = this.state.decryptSuccessful ?
        `${this.props.cryptDevice} set up successfully` :
        `cryptsetup: ERROR: ${this.props.cryptDevice}: cryptsetup failed, bad password or options?`;
      return <div>
        {text}
        <Timeout timeoutSeconds={0.7} onComplete={this.nextScreen} />
      </div>
    }
  }

  nextScreen = () => {
    if (this.state.decryptSuccessful !== null) {//Assert: always true
      tryDecrypt(this.state.decryptSuccessful);
    }
  }
}

interface Props {
  cryptDevice: string,
  reduxState: ReduxState,
}

interface State {
  decryptSuccessful: boolean | null,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    cryptDevice: state.const.cryptDevice || "<ERROR: No crypt device found>",
    reduxState: state,
  };
};

const ReduxScreenPlymouthCheckingPassword = connect(mapStateToProps)(ScreenPlymouthCheckingPassword);
export default ReduxScreenPlymouthCheckingPassword;
