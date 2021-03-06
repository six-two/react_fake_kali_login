import React from 'react';
import Clock from 'react-live-clock';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { setScreen, setLoginOpenMenu } from '../../redux/actions';
import * as C from '../../redux/constants';
import MenuBarItem from '../../Menu';
import { iconBars, iconAccessibility, iconShutdown } from '../../Images';


const SESSION_MENU: MenuData = {
  name: "session",
  icon: iconBars,
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
    onClick: () => console.warn("TODO toggle big font"),
    shortcutKey: "f1",
  }, {
    name: "High Contrast",
    onClick: () => console.warn("TODO toggle high contrast"),
    shortcutKey: "f2",
  }],
};

const SHUTDOWN_MENU: MenuData = {
  name: "shutdown",
  icon: iconShutdown,
  menuItems: [{
    name: "Suspend",
    onClick: () => setScreen(C.SCREEN_SUSPEND),
  }, {
    name: "Hibernate",
    onClick: () => setScreen(C.SCREEN_OFF),
  }, {
    name: "Restart...",
    onClick: () => setScreen(C.SCREEN_DIALOG_REBOOT),
  }, {
    name: "Shut Down...",
    onClick: () => setScreen(C.SCREEN_DIALOG_SHUTDOWN),
    shortcutKey: "alt+f4", //oops, might quit the browser
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
    let disabled = this.props.disableMenus === true;
    let selected = menu.name === this.props.openMenu;

    return <div>
      <MenuBarItem name={menu.name} icon={menu.icon}
        disable={disabled}
        selected={selected}
        onClick={this.onMenuSelected}
        close={this.closeCurrentMenu}>

        <div className="menu">
          {menu.menuItems.map(this.renderMenuItem)}
        </div>
      </MenuBarItem>
      <div className="key-shortcut-listeners">
        {menu.menuItems.filter((item) => !!item.shortcutKey)
          .map((item) => {
            return <KeyboardEventHandler handleKeys={[item.shortcutKey]}
              handleFocusableElements
              onKeyEvent={item.onClick}
              key={item.shortcutKey} />
          })}
      </div>
    </div>
  }

  renderMenuItem(item: MenuItem) {
    let onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setLoginOpenMenu(null);
      item.onClick && item.onClick();
    };
    return <div className="menu-item" onClick={onClick} key={item.name}>
      {item.name}
      {item.shortcutKey &&
        <div className="keybinding">
          {formatKeyboardShortcut(item.shortcutKey)}
        </div>}
    </div>
  }

  onMenuSelected = (name: string) => {
    setLoginOpenMenu(name);
  }

  closeCurrentMenu = () => {
    setLoginOpenMenu(null);
  }
}

function formatKeyboardShortcut(str: string) {
  return str.toLowerCase().split('+').map(function(key) {
    return (key.charAt(0).toUpperCase() + key.slice(1));
  }).join('-');
}

interface State {
}

interface Props {
  hostname: string,
  disableMenus?: boolean,
  openMenu: string | null,
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
    hostname: state.const.hostname,
    openMenu: state.var.login.openMenu,
  };
};

const ReduxStatusBar = connect(mapStateToProps)(StatusBar);
export default ReduxStatusBar;
