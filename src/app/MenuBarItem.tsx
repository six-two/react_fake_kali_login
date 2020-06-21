import React from 'react';
import Popup from "reactjs-popup";
// import { useHover, ToggleLayer } from "react-laag";
// import ResizeObserver from "resize-observer-polyfill";
import TrackVisibility from 'react-on-screen';


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
    let classes = classNames.join(" ");
    let dom = this.props.icon ?
      <img className={classes} src={this.props.icon} alt={this.props.name} />
      : <div className={classes}>{this.props.name}</div>;
    let menuDom = <div className="menu">
      <div className="menu-item"> item 1</div>
      <div className="menu-item"> item 2</div>
      <div className="menu-item"> item 3</div>
    </div>;
    return <Popup
      className={classNames.join(" ")}
      trigger={dom}
      position="bottom left"
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={0}
      mouseEnterDelay={0}
      arrow={false}
    >
      <TrackVisibility className="visibility-tracker">
        {({ isVisible }) => {
          if (isVisible) {
            //render normally
            return menuDom;
          } else {
            return <div style={{ position: "fixed", top: "27px", right: "0px", backgroundColor: "red" }}>
              {menuDom}
            </div>
          }
        }}
      </TrackVisibility>
    </Popup>

    // return <ToggleLayer ResizeObserver={ResizeObserver}
    //   renderLayer={({ isOpen, layerProps }) =>
    //     isOpen && (
    //       <div
    //         ref={layerProps.ref}
    //         className="menu"
    //         style={{
    //           ...layerProps.style,
    //           backgroundColor: "gray",
    //           width: "100px",
    //         }}
    //       >
    //         Layer
    //       </div>
    //     )
    //   }
    //   placement={{
    //     anchor: "BOTTOM_LEFT",
    //     possibleAnchors: ["BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"],
    //     autoAdjust: true,
    //     triggerOffset: 0,
    //   }}
    //     >
    //       {({ triggerRef, toggle }) => (
    //         <div ref={triggerRef} onClick={toggle}>
    //           {dom}
    // </div>
    //       )}
    //     </ToggleLayer>
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
