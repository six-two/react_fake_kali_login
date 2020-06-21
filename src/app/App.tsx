import React from 'react';
import './App.scss';

// TODOs

// --- Nice to have ---


export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="App">
      <h1>TODO</h1>
    </div>
  }
}

interface State {
}
