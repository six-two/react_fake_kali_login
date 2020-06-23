import React from 'react';
import { connect } from 'react-redux';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';
import { ReduxState } from './redux/store';
import imagePlymountBackground from '../img/decrypt.jpg';

// TODO base it on /usr/share/plymouth/themes/kali/
class ScreenPlymouthBoot extends React.Component<Props> {
  componentDidMount() {
    let durationInMs = Math.round(this.props.duration * 1000);
    setTimeout(() => setScreen(C.SCREEN_LOGIN), durationInMs);
  }

  render() {
    return <div className="screen-plymouth-boot">
      <img className="fill-screen" src={imagePlymountBackground} alt="" />
    </div>
  }
}

interface Props {
  duration: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    duration: state.const.plymountDuration,
  };
};

const ReduxScreenPlymouthBoot = connect(mapStateToProps)(ScreenPlymouthBoot);
export default ReduxScreenPlymouthBoot;
