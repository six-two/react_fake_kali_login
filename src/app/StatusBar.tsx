import React from 'react';
import Clock from 'react-live-clock';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { setScreen } from './redux/actions';
import * as C from './redux/constants';
import MenuBarItem from './MenuBarItem';
import iconSession from '../img/bars.png';
import iconAccessibility from '../img/accessibility.png';
import iconShutdown from '../img/shutdown.png';


const SESSION_MENU: MenuData = {
  name: "session",
  icon: iconSession,
  menuItems: [
    { name: "Default Xsession" },
    { name: "Xfce Session" },
  ],
};

const KEYBOARD_MENU: MenuData = {
  name: "English",
  menuItems: [{ name: "English - US" }],
};

const ACCESSIBILITY_MENU: MenuData = {
  name: "accessibility",
  icon: iconAccessibility,
  menuItems: [{
    name: "Large Font",
    onClick: () => alert("TODO toggle big font"),
    shortcutKey: "f1",
  }, {
    name: "High Contrast",
    onClick: () => alert("TODO toggle high contrast"),
    shortcutKey: "f2",
  }],
};

const SHUTDOWN_MENU: MenuData = {
  name: "shutdown",
  icon: iconShutdown,
  menuItems: [{
    name: "Suspend",
    onClick: () => setScreen(C.SCREEN_SUSPEND),
    shortcutKey: "ctrl+z",//TODO remove, just for testing
  }, {
    name: "Hibernate",
    onClick: () => setScreen(C.SCREEN_OFF),
  }, {
    name: "Restart...",
    onClick: () => alert("TODO reboot dialog"),
  }, {
    name: "Shut Down...",
    onClick: () => setScreen(C.SCREEN_DIALOG_SHUTDOWN),
    shortcutKey: "alt+f4",//oops, might quit the browser
  }],
};

class StatusBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="status-bar h-flex">
      <div className="hostname">{this.props.hostname}</div>
      <div className="expand"></div>
      {this.renderMenu(SESSION_MENU)}
      {this.renderMenu(KEYBOARD_MENU)}
      {this.renderMenu(ACCESSIBILITY_MENU)}
      <div className="clock"><Clock format={'MMM D, HH:mm'} /></div>
      {this.renderMenu(SHUTDOWN_MENU)}
    </div>
  }

  renderMenu(menu: MenuData) {
    let disabled = this.props.disableMenus ?? false;
    let selected = menu.name === this.state.activeMenu;

    return <div>
      <MenuBarItem name={menu.name} icon={menu.icon}
        disable={disabled}
        selected={selected} onClick={this.onMenuSelected}>

        <div className="menu">
          {menu.menuItems.map(this.renderMenuItem)}
        </div>
      </MenuBarItem>
      <div className="key-shortcut-listeners">
        {menu.menuItems.filter((item) => !!item.shortcutKey)
          .map((item) => {
            return <KeyboardEventHandler handleKeys={[item.shortcutKey]}
              handleFocusableElements
              onKeyEvent={item.onClick} />
          })}
      </div>
    </div>
  }

  renderMenuItem(item: MenuItem) {
    return <div className="menu-item" onClick={item.onClick} key={item.name}>
      {item.name}
      {item.shortcutKey &&
        <div className="keybinding">
          {formatKeyboardShortcut(item.shortcutKey)}
        </div>}
    </div>
  }

  onMenuSelected = (name: string) => {
    // this.setState({activeMenu: });
  }
}

function formatKeyboardShortcut(str: string) {
  return str.toLowerCase().split('+').map(function(key) {
    return (key.charAt(0).toUpperCase() + key.slice(1));
  }).join('-');
}

interface State {
  activeMenu?: string,
}

interface Props {
  hostname: string,
  disableMenus?: boolean,
}

interface MenuData {
  name: string,
  icon?: string,
  menuItems: MenuItem[],
}

interface MenuItem {
  name: string,
  onClick?: () => void,
  shortcutKey?: string,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    hostname: state.hostname,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    // updatedClipbordManager: () => dispatch(updatedClipbordManager()),
  };
};

const ReduxStatusBar = connect(mapStateToProps, mapDispatchToProps)(StatusBar);
export default ReduxStatusBar;
