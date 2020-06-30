import React from 'react';
import logo from '../img/plymouth/kali-logo.png';
import fade from '../img/plymouth/kali-logo-fade.png';
import container from '../img/plymouth/kali-logo-container.png';
import outline from '../img/plymouth/outline.png';

const STAGE_ONE = 0.4;
const STAGE_TWO = 0.9;
const FADE_THE_FADE = 0.10;

// TODO base it on /usr/share/plymouth/themes/kali/
export default class BootAnimation extends React.Component<Props> {
  render() {
    let p = this.props.progress;
    let logoStyle = {};
    let outlineStyle = {};
    // let fadeStyle = { opacity: 0 };
    let fadeStyle = {};

    if (isInRange(p, 0, STAGE_ONE)) {
      fadeStyle = { opacity: relativeProgress(p, 0, STAGE_ONE) / 2 };
      logoStyle = { opacity: relativeProgress(p, 0, STAGE_ONE) };
    }
    if (isInRange(p, STAGE_ONE, STAGE_TWO)) {
      let top = (1 - relativeProgress(p, STAGE_ONE, STAGE_TWO)) * 340;
      outlineStyle = { top: `${top}px` };

      let stageTwo1 = STAGE_TWO - 2 * FADE_THE_FADE;
      let stageTwo2 = stageTwo1 + FADE_THE_FADE;

      if (isInRange(p, stageTwo1, stageTwo2)) {
        let r = relativeProgress(p, stageTwo1, stageTwo2);
        fadeStyle = { opacity: 0.5 + r / 2 };
      }
      if (isInRange(p, stageTwo2, STAGE_TWO)) {
        let r = relativeProgress(p, stageTwo2, STAGE_TWO);
        fadeStyle = { opacity: (1 - r / 2) };
      }
    }
    if (isInRange(p, STAGE_TWO, 1)) {
      logoStyle = { opacity: (1 - relativeProgress(p, STAGE_TWO, 1)) };
    }

    return <div className="kali-dragon-container">
      <img style={outlineStyle} className="outline fill-screen" src={outline} alt="" />
      <img className="container fill-screen" src={container} alt="" />
      <img style={fadeStyle} className="fade fill-screen" src={fade} alt="" />
      <img style={logoStyle} className="logo fill-screen" src={logo} alt="" />
    </div>
  }
}

function isInRange(n: number, min: number, max: number) {
  return n >= min && n < max;
}

function relativeProgress(n: number, min: number, max: number) {
  return (n - min) / (max - min);
}

interface Props {
  progress: number,
}
