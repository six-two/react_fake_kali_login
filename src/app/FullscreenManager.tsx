import React, { Component } from "react";
import Fullscreen from "react-full-screen";
import KeyboardEventHandler from 'react-keyboard-event-handler';

class FullscreenManager extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isFull: false,
    };
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

  render() {
    return (
      <div>
        <KeyboardEventHandler handleKeys={["ctrl+space"]} handleFocusableElements onKeyEvent={this.goFull} />

        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}
        >
          {this.state.isFull && this.props.children}
        </Fullscreen>
      </div>
    );
  }
}

export default FullscreenManager;
