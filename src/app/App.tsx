import React from 'react';
import './App.scss';
import TurnedOffScreen from './TurnedOffScreen';
import StatusBar from './StatusBar';

// TODOs

// --- Nice to have ---


export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  // <TurnedOffScreen />
  render() {
    return <div className="App">
      <h1>TODO</h1>
      <StatusBar />
    </div>
  }
}

interface State {
}
