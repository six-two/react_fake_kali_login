import React from 'react';
import Popup from "reactjs-popup";


export default class MenuBarItem extends React.Component<Props> {
  render() {
    let onClick = this.props.disable ? this.onClick : undefined;
    let selected = this.props.disable ? false : this.props.selected;
    let classNames = ["menu-bar-item"];
    if (this.props.disable) {
      classNames.push("menu-disabled");
    } else if (this.props.selected) {
      classNames.push("menu-selected");
    }
    let dom = this.props.icon ?
      <img src={this.props.icon} alt={this.props.name} />
      : <div>this.props.name</div>;
    return <Popup
      className={classNames.join(" ")}
      trigger={dom}
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
  }

  onClick = () => {
    this.props.onClick(this.props.name);
  }
}

interface Props {
  name: string,
  icon?: string,
  disable?: boolean,
  selected: boolean,
  onClick: (name: string) => void,
}
