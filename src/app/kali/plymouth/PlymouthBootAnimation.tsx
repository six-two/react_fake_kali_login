import React from 'react';
import {kaliFade, kaliLogo, kaliOutline, kaliContainer} from '../../Images';

const STAGE_ONE = 0.4;
const STAGE_TWO = 0.9;
const FADE_THE_FADE = 0.10;


export function PlymouthLogoPassword(props: NoProps) {
  return <PlymouthLogo className="logo-password" />
}

export function PlymouthLogoBooting(props: AnimationProps) {
  let p = props.progress;
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

  return <PlymouthLogo className="logo-boot-animation" logoStyle={logoStyle}
    fadeStyle={fadeStyle} outlineStyle={outlineStyle} />
}

export function PlymouthLogoShutdown(props: NoProps) {
  return <PlymouthLogo className="logo-shutdown" />
}

function PlymouthLogo(props: LogoProps) {
  let className = "kali-logo";
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}>
    <img style={props.outlineStyle} className="outline fill-screen" src={kaliOutline} alt="" />
    <img className="container fill-screen" src={kaliContainer} alt="" />
    <img style={props.fadeStyle} className="fade fill-screen" src={kaliFade} alt="" />
    <img style={props.logoStyle} className="logo fill-screen" src={kaliLogo} alt="" />
  </div>
}

interface NoProps {
}

interface AnimationProps {
  progress: number,
}

interface LogoProps {
  className?: string,
  outlineStyle?: React.CSSProperties,
  fadeStyle?: React.CSSProperties,
  logoStyle?: React.CSSProperties,
}

function isInRange(n: number, min: number, max: number) {
  return n >= min && n < max;
}

function relativeProgress(n: number, min: number, max: number) {
  return (n - min) / (max - min);
}
