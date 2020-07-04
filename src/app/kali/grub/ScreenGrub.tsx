import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import SimpleCountdown from '../../SimpleCountdown';
import imageGrubBackground from '../../../img/grub.jpg';

//should be escape, but that would exit full screen mode
// So maybe use stuff in normal fullscreen mode (F11 of Firefox/Chrome)
const GRUB_BACK_KEY = "backspace";


export default class ScreenLogin extends React.Component<Props> {
  render() {
    return <div className="screen-grub">
      <img className="fill-screen" src={imageGrubBackground} alt=""></img>
      <div className="fill-screen v-flex">
        <KeyboardEventHandler
          handleKeys={["up", "down", "enter", GRUB_BACK_KEY]}
          onKeyEvent={this.onKeyEvent}>
        </KeyboardEventHandler>
        <div className="expand"></div>
        <div className="menu">
          {this.props.entries.map(this.renderEntry)}
        </div>
        <div className="expand">
          {this.props.timeout && this.props.lastScreenChange &&
            <SimpleCountdown
              startDate={this.props.lastScreenChange}
              seconds={this.props.timeout}
              onCompleted={() => {
                // Activate the first menu entry
                this.props.entries[0].onSelected();
              }}
              formatString="Booting in %s seconds" />}
        </div>
      </div>
    </div>
  }

  renderEntry = (entry: MenuEntry, index: number) => {
    let selectedClass = index === this.props.selected ? " selected" : "";
    return <div className={"entry" + selectedClass} key={index}>
      {entry.title}
    </div>
  }

  onKeyEvent = (key: string, event: any) => {
    console.debug(`[Grub] key: ${key}`)
    switch (key) {
      case "up": {
        this.select(this.props.selected - 1);
        break;
      }
      case "down": {
        this.select(this.props.selected + 1);
        break;
      }
      case "enter": {
        let index = this.props.selected;
        this.props.entries[index].onSelected();
        break;
      }
      case GRUB_BACK_KEY: {
        this.props.onBack();
        break;
      }
    }
  }

  select(index: number) {
    if (index >= 0 && index < this.props.entries.length) {
      this.props.setSelectedIndex(index);
    }
  }
}

interface Props {
  entries: MenuEntry[],
  timeout?: number,
  lastScreenChange?: Date,
  selected: number,
  setSelectedIndex: (newValue: number) => void,
  onBack: () => void,
}

interface MenuEntry {
  title: string,
  onSelected: () => void,
}
