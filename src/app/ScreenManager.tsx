import React from 'react';
import { connect } from 'react-redux';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';
import { ReduxState } from './redux/store';
import ScreenGrubGreeting from './ScreenGrubGreeting';
import ScreenGrubMain from './ScreenGrubMain';
import ScreenGrubAdvanced from './ScreenGrubAdvanced';
import ScreenConsoleBooting from './ScreenConsoleBooting';
import ScreenPlymouthPassword from './ScreenPlymouthPassword';
import ScreenPlymouthBoot from './ScreenPlymouthBoot';
import ScreenLogin from './ScreenLogin';
import ScreenOff from './TurnedOffScreen';
import ScreenShutdown from './ScreenShutdown';
import ScreenSuspend from './ScreenSuspend';
import LoginDialog from './LoginDialog';
import ShutdownConfirmDialog from './ShutdownConfirmDialog';


function preventContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  if (!C.DEBUG) {
    e.preventDefault();
    e.stopPropagation();
  }
}

class ScreenManager extends React.Component<Props> {
  render() {
    return <div className="screen-manager fill-screen" onContextMenu={preventContextMenu}>
      {this.renderContent()}
    </div>
  }

  renderContent() {
    switch (this.props.screen) {
      case C.SCREEN_GRUB:
        return <ScreenGrubGreeting />
      case C.SCREEN_GRUB_MENU:
        return <ScreenGrubMain />
      case C.SCREEN_GRUB_ADVANCED:
        return <ScreenGrubAdvanced />
      case C.SCREEN_CONSOLE_BOOTING:
        return <ScreenConsoleBooting />
      case C.SCREEN_PLYMOUTH_PASSWORD:
        return <ScreenPlymouthPassword />
      case C.SCREEN_PLYMOUTH_BOOT:
        return <ScreenPlymouthBoot />
      case C.SCREEN_LOGIN:
        return <ScreenLogin>
          <LoginDialog />
        </ScreenLogin>;
      case C.SCREEN_DIALOG_REBOOT:
        return renderRebootConfirmDialog();
      case C.SCREEN_DIALOG_SHUTDOWN:
        return renderShutdownConfirmDialog();
      case C.SCREEN_SUSPEND:
        return <ScreenSuspend />;
      case C.SCREEN_SHUTDOWN:
        return <ScreenShutdown />
      case C.SCREEN_OFF:
        return <ScreenOff />;
      default:
        return <h1 style={{ color: "red" }}>
          {`Unknown screen: "${this.props.screen}"`}
        </h1>
    }
  }
}

const renderRebootConfirmDialog = () => {
  return <ScreenLogin>
    <ShutdownConfirmDialog
      title="Restart"
      message="Are you sure you want to close all programs and restart the computer?"
      icon="TODO"
      confirmButtonText="Restart"
      onConfirm={() => setScreen(C.SCREEN_REBOOT)}
      onCancel={() => setScreen(C.SCREEN_LOGIN)}
    />
  </ScreenLogin>
}

const renderShutdownConfirmDialog = () => {
  return <ScreenLogin>
    <ShutdownConfirmDialog
      title="Shut Down"
      message="Are you sure you want to close all programs and shut down the computer?"
      icon="TODO"
      confirmButtonText="Shut Down"
      onConfirm={() => setScreen(C.SCREEN_SHUTDOWN)}
      onCancel={() => setScreen(C.SCREEN_LOGIN)}
    />
  </ScreenLogin>
}

interface Props {
  screen: string,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    screen: state.var.screen.name,
  };
};

const ReduxScreenManager = connect(mapStateToProps)(ScreenManager);
export default ReduxScreenManager;
