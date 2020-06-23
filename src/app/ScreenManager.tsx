import React from 'react';
import { connect } from 'react-redux';
import { setScreen, setGrubMainSelectedIndex } from './redux/actions';
import * as C from './redux/constants';
import { ReduxState } from './redux/store';
import ScreenGrub from './ScreenGrub';
import ScreenLogin from './ScreenLogin';
import ScreenOff from './TurnedOffScreen';
import ScreenSuspend from './ScreenSuspend';
import LoginDialog from './LoginDialog';
import ShutdownConfirmDialog from './ShutdownConfirmDialog';


class ScreenManager extends React.Component<Props> {
  render() {
    return <div className="screen-manager fill-screen">
      {this.renderContent()}
    </div>
  }

  renderContent() {
    switch (this.props.screen) {
      case C.SCREEN_GRUB:
        return <ScreenGrub entries={[{
          title: "Kali GNU/Linux",
          onSelected: () => {
            //TODO set kernel
            //TODO coupound events?
            setScreen(C.SCREEN_LOGIN);
          },
        }, {
          title: "Advanced options for K",
          onSelected: () => {
            setScreen(C.SCREEN_GRUB_ADVANCED);
          },
        }, {
          title: "System setup",
          onSelected: () => {
            alert("How am I supposed to emulate this?\nI will probably just show you an error or do a normal reboot!");
          },
        }]} onBack={() => { }} selected={this.props.selected}
          setSelectedIndex={setGrubMainSelectedIndex} />
      case C.SCREEN_LOGIN:
        return <ScreenLogin>
          <LoginDialog />
        </ScreenLogin>;
      case C.SCREEN_DIALOG_SHUTDOWN:
        return <ScreenLogin>
          <ShutdownConfirmDialog
            title="Shut Down"
            message="Are you sure you want to close all programs and shut down the computer?"
            icon="TODO"
            confirmButtonText="Shut Down"
            onConfirm={() => setScreen(C.SCREEN_OFF)}
            onCancel={() => setScreen(C.SCREEN_LOGIN)}
          />
        </ScreenLogin>
      case C.SCREEN_SUSPEND:
        return <ScreenSuspend />;
      case C.SCREEN_OFF:
        return <ScreenOff />;
      default:
        return <h1>{`Unknown screen: "${this.props.screen}"`}</h1>
    }
  }
}

interface Props {
  screen: string,
  selected: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    screen: state.screen.name,
    selected: state.boot.selectedMain,
  };
};

const ReduxScreenManager = connect(mapStateToProps)(ScreenManager);
export default ReduxScreenManager;
