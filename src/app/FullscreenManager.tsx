import React, { Component } from "react";
import Fullscreen from "react-full-screen";
import KeyboardEventHandler from 'react-keyboard-event-handler';

class FullscreenManager extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFullscreen: false,
    };
  }

  requestFullscreen = () => {
    this.setState({ isFullscreen: true });
  }

  render() {
    let showContents = this.state.isFullscreen;
    if (this.props.alwaysShowContents === true) {
      showContents = true;
    }
    return (
      <div>
        <KeyboardEventHandler handleKeys={["ctrl+space"]} handleFocusableElements
          onKeyEvent={this.requestFullscreen} />

        <Fullscreen
          enabled={this.state.isFullscreen}
          onChange={isFullscreen => this.setState({ isFullscreen: isFullscreen })}
        >
          {showContents && this.props.children}
        </Fullscreen>
      </div>
    );
  }
}

interface Props {
  alwaysShowContents?: boolean,
}

interface State {
  isFullscreen: boolean;
}

export default FullscreenManager;
