import React from 'react';
import Clock from 'react-live-clock';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import MenuBarItem from './MenuBarItem';
import iconSession from '../img/bars.png';
import iconAccessibility from '../img/accessibility.png';
import iconShutdown from '../img/shutdown.png';


const SESSION_MENU: MenuData = {
  name: "session",
  icon: iconSession,
  menuItems: ["Test", "123"],
};

const KEYBOARD_MENU: MenuData = {
  name: "English",
  menuItems: ["English - US"],
};

const ACCESSIBILITY_MENU: MenuData = {
  name: "accessibility",
  icon: iconAccessibility,
  menuItems: ["Test", "123"],
};

const SHUTDOWN_MENU: MenuData = {
  name: "shutdown",
  icon: iconShutdown,
  menuItems: ["Suspend"],
};

class StatusBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    let disableMenu = this.props.disableMenus ? true : undefined;
    //TODO render menu popup
    return <div className="status-bar h-flex">
      <div className="hostname">{this.props.hostname}</div>
      <div className="expand"></div>

      {this.renderMenu(SESSION_MENU)}
      {this.renderMenu(KEYBOARD_MENU)}
      {this.renderMenu(ACCESSIBILITY_MENU)}
      <div id="clock"><Clock format={'MMM D, HH:mm'} /></div>
      {this.renderMenu(SHUTDOWN_MENU)}
    </div>
  }

  renderMenu(menu: MenuData) {
    let disabled = this.props.disableMenus ?? false;
    let selected = menu.name === this.state.activeMenu;
    return <MenuBarItem name={menu.name} icon={menu.icon}
      disable={disabled}
      selected={selected} onClick={this.onMenuSelected} />
  }

  onMenuSelected = (name: string) => {
    // this.setState({activeMenu: });
  }
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
  menuItems: string[],
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
