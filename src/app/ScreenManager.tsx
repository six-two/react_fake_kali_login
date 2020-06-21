import React from 'react';
import { connect } from 'react-redux';
import { SCREEN_LOGIN, SCREEN_OFF } from './redux/actions';
import { ReduxState } from './redux/store';
import ScreenLogin from './ScreenLogin';
import ScreenOff from './TurnedOffScreen';


class ScreenManager extends React.Component<Props> {
  render() {
    return <div className="screen-manager fill-screen">
      {this.renderContent()}
    </div>
  }

  renderContent() {
    switch (this.props.screen) {
      case SCREEN_LOGIN:
        return <ScreenLogin />;
      case SCREEN_OFF:
        return <ScreenOff />;
      default:
        return <h1>{`Unknown screen: "${this.props.screen}"`}</h1>
    }
  }
}

interface Props {
  screen: string,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    screen: state.screen,
  };
};

const ReduxScreenManager = connect(mapStateToProps)(ScreenManager);
export default ReduxScreenManager;
