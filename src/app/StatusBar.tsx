import React from 'react';
import MenuBarItem from './MenuBarItem';

const SESSION_MENU: MenuData = {
  name: "session",
  icon: "img/bars.png",
  menuItems: ["Test", "123"],
};

export default class StatusBar extends React.Component<Props, State> {
  defaultProps = {
    hostname: "Kali Linux",
    disableMenus: false,
  }

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
      <div id="mb-keyboard">English</div>
      <img id="mb-accessibility" src="img/accessibility.png" alt="<human>" />
      <div id="clock"></div>
      <img id="mb-shutdown" src="img/shutdown.png" alt="<shutdown>" />
    </div>
  }

  renderMenu(menu: MenuData) {
    let selected = menu.name === this.state.activeMenu;
    return <MenuBarItem name={menu.name} icon={menu.icon}
      disable={this.props.disableMenus}
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
  hostname?: string,
  disableMenus?: boolean,
}

interface MenuData {
  name: string,
  icon?: string,
  menuItems: string[],
}
