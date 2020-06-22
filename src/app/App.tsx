import React from 'react';
import '../css/App.scss';
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
      <h1>Nothing to see here</h1>
      <FullscreenManager alwaysShowContents={DEBUG}>
        <ScreenManager />
        <h1 style={{ color: "red" }}>Fullscreen content</h1>
      </FullscreenManager>
    </div>
  }
}

interface State {
}
