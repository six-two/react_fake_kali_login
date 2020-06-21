import React from 'react';

export default class StatusBar extends React.Component<Props> {
  defaultProps = {
    disable: false,
  };

  render() {
    let dom = this.props.icon ?
      <img src={this.props.icon} alt={this.props.name} />
      : this.props.name;
    let onClick = this.props.disable ? this.onClick : undefined;
    let classNames = ["menu-bar-item"];
    if (this.props.disable) {
      classNames.push("menu-disabled");
    } else if (this.props.selected) {
      classNames.push("menu-selected");
    }
    return <div className={classNames.join(" ")} onClick={onClick}>
      {dom}
    </div>
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
