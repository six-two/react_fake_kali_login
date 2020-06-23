import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { setLoginOpenMenu } from './redux/actions';
import StatusBar from './StatusBar';
import imageGrubBackground from '../img/grub.jpg';


const GRUB_BACK_KEY = "backspace";//should be escape, but that would exit full screen mode

//TODO countdown timer
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
        {this.props.entries.map(this.renderEntry)}
        <div className="expand"></div>
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
        let index = this.props.selected - 1;
        if (index >= 0) {
          this.props.setSelectedIndex(index);
        }
        break;
      }
      case "down": {
        let index = this.props.selected + 1;
        if (index < this.props.entries.length) {
          this.props.setSelectedIndex(index);
        }
        break;
      }
      case "enter": {
        let index = this.props.selected;
        this.props.entries[index].onSelected();
        break;
      }
      case GRUB_BACK_KEY: {
        this.props.onBack();
      }
    }
  }
}

interface Props {
  entries: MenuEntry[],
  timeout?: number,
  selected: number,
  setSelectedIndex: (newValue: number) => void,
  onBack: () => void,
}

interface MenuEntry {
  title: string,
  onSelected: () => void,
}
