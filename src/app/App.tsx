import React from 'react';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import Popup from "reactjs-popup";
import '../css/App.scss';
import TurnedOffScreen from './TurnedOffScreen';
import StatusBar from './StatusBar';
import FullscreenManager from './FullscreenManager';
import ScreenManager from './ScreenManager';

// TODOs

// --- Nice to have ---

const DEBUG = true;


export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="App">
      <h1>TODO</h1>
      <StatusBar />
      <div className="menu">
        <div className="menu-item"> Menu item 1</div>
        <div className="menu-item"> Menu item 2</div>
        <div className="menu-item"> Menu item 3</div>
        <Popup
          trigger={<div className="menu-item"> Sub menu </div>}
          position="bottom left"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          arrow={false}
        >
          <div className="menu">
            <div className="menu-item"> item 1</div>
            <div className="menu-item"> item 2</div>
            <div className="menu-item"> item 3</div>
          </div>
        </Popup>
        <div className="menu-item"> Menu item 4</div>
      </div>
      <FullscreenManager alwaysShowContents={DEBUG}>
        <ScreenManager />
        <h1 style={{ color: "red" }}>Fullscreen content</h1>
      </FullscreenManager>
    </div>
  }
}

interface State {
}
