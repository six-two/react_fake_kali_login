import React from 'react';
import { connect } from 'react-redux';
import * as C from '../redux/constants';
import { ReduxState } from '../redux/store';
import ScreenCover from '../ScreenCover';
import ScreenGrubGreeting from './grub/ScreenGrubGreeting';
import ScreenGrubMain from './grub/ScreenGrubMain';
import ScreenGrubAdvanced from './grub/ScreenGrubAdvanced';
import ScreenConsoleBooting from './grub/ScreenConsoleBooting';
import ScreenPlymouthPassword from './plymouth/ScreenPlymouthPassword';
import ScreenPlymouthCheckingPassword from './plymouth/ScreenPlymouthCheckingPassword';
import ScreenPlymouthBoot from './plymouth/ScreenPlymouthBoot';
import ScreenLogin from './login/ScreenLogin';
import ScreenOff from './TurnedOffScreen';
import ScreenShutdown from './plymouth/ScreenShutdown';
import ScreenSuspend from './ScreenSuspend';
import LoginDialog from './login/LoginDialog';
import { ShutdownConfirmDialog, RebootConfirmDialog } from './login/ShutdownConfirmDialog';


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
      case C.SCREEN_COVER:
        return <ScreenCover />
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
      case C.SCREEN_PLYMOUTH_CHECK_PASSWORD:
        return <ScreenPlymouthCheckingPassword />
      case C.SCREEN_PLYMOUTH_BOOT:
        return <ScreenPlymouthBoot />
      case C.SCREEN_LOGIN:
        return <ScreenLogin>
          <LoginDialog />
        </ScreenLogin>
      case C.SCREEN_DIALOG_REBOOT:
        return <ScreenLogin>
          <RebootConfirmDialog />
        </ScreenLogin>
      case C.SCREEN_DIALOG_SHUTDOWN:
        return <ScreenLogin>
          <ShutdownConfirmDialog />
        </ScreenLogin>
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
