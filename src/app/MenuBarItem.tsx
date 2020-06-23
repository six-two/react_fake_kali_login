import React from 'react';
import TrackVisibility from 'react-on-screen';


export default class MenuBarItem extends React.Component<Props> {
  render() {
    let onClick = !this.props.disable ? this.onClick : undefined;
    let selected = this.props.disable ? false : this.props.selected;

    let classNames = ["menu-bar-item"];
    if (this.props.disable) {
      classNames.push("menu-disabled");
    } else if (selected) {
      classNames.push("menu-selected");
    }
    let classes = classNames.join(" ");

    let triggerDom = this.props.icon ?
      <img src={this.props.icon} alt={this.props.name} />
      : this.props.name;
    let menuDom = <TrackVisibility className="visibility-tracker">
      {({ isVisible }) => {
        let popupClass = isVisible ? "popup-normal" : "popup-fix-position";
        return <div className={popupClass}>{this.props.children}</div>
      }}
    </TrackVisibility>;
    return <div className="menu-div">
      <div className={classes} onClick={onClick}>
        {triggerDom}
      </div>
      {selected && menuDom}
    </div>;
  }

  onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    console.log("Menu selected:", this.props.name);
    if (this.props.selected) {
      this.props.close();
    } else {
      this.props.onClick(this.props.name);
    }
  }
}

interface Props {
  name: string,
  icon?: string,
  disable?: boolean,
  selected: boolean,
  onClick: (name: string) => void,
  close: () => void,
}
