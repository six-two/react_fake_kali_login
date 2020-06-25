import React from 'react';
import { DEFAULT_CONSTANTS } from './redux/store';
import * as C from './redux/constants';
import { initialSetup } from './redux/actions';

const GENERIC_EDIT_FIELDS: InputDescription[] = [{
  title: "Hostname",
  settingsName: "hostname",
  checkForErrors: (value: string) => { return null; },
}];

const TIMING_FIELDS: InputDescription[] = [
  { title: "Kernel load", settingsName: "kernelLoadDuration" },
  { title: "Initial ramdisk load", settingsName: "initrdLoadDuration" },
  { title: "Kali logo (boot)", settingsName: "plymountDuration" },
  { title: "Kali logo (shutdown)", settingsName: "shutdownDuration" },
].map((obj) => { return { ...obj, checkForErrors: checkTimingStringForErrors }; });

function checkTimingStringForErrors(string: string): string | null {
  let number = Number(string);
  if (isNaN(number)) {
    return "Not a valid number";
  }
  if (number < 0) {
    return "Number can not be negative";
  }
  return null;
}

//TODO signal which fields can be left empty
//TODO add descriptions
class ScreenSetup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      settings: {
        hostname: DEFAULT_CONSTANTS.hostname,
        // defaultKernel: DEFAULT_CONSTANTS.defaultKernel,
        //kernels: make nice list with up down add, default?
        bootTimeout: "" + DEFAULT_CONSTANTS.bootTimeout,
        cryptDevice: DEFAULT_CONSTANTS.cryptDevice || "",
        //timing
        kernelLoadDuration: "" + DEFAULT_CONSTANTS.kernelLoadDuration,
        initrdLoadDuration: "" + DEFAULT_CONSTANTS.initrdLoadDuration,
        plymountDuration: "" + DEFAULT_CONSTANTS.plymountDuration,
        shutdownDuration: "" + DEFAULT_CONSTANTS.shutdownDuration,
        // server verification
        checkLoginCredentialsUrl: DEFAULT_CONSTANTS.checkLoginCredentialsUrl || "",
        checkDecryptionPasswordUrl: DEFAULT_CONSTANTS.checkDecryptionPasswordUrl || "",
        serverRequestTimeout: "" + DEFAULT_CONSTANTS.serverRequestTimeout,
        // local verification
        validLoginUsernameRegex: DEFAULT_CONSTANTS.validLoginUsernameRegex.source,
        validLoginPasswordRegex: DEFAULT_CONSTANTS.validLoginPasswordRegex.source,
        validDecryptionPasswordRegex: DEFAULT_CONSTANTS.validDecryptionPasswordRegex.source,
      },
    };
  }

  componentDidMount() {
    // read url (hash) params
    // if hash has "setup=skip": immediately start the simulation
    let hash = window.location.hash;
    let settings = { ...this.state.settings };
    if (hash) {
      let setup;
      let params = new URLSearchParams(hash.substr(1));
      for (let [key, value] of params.entries()) {
        value = decodeURIComponent(value);
        if (value === "null"){
          value = "";
        }
        if (key === "setup") {
          setup = value; //if multiple definitions: only keep the last value
        } else {
          if (settings[key] !== undefined) {
            console.log(`Using url parameter: ${key} -> ${value}`);
            settings[key] = value;
          } else {
            console.warn(`Unknown url parameter: ${key}`);
          }
        }
      }
      this.setState({ settings: settings });
      if (setup === "skip") {
        console.log("Trying to skip setup");
        start(settings, false);
      }
    }
  }

  getParamString() {
    let params = [];
    for (let [key, value] of Object.entries(this.state.settings)) {
      value = encodeURIComponent(value);
      if (value === "") {
        value = "null";
      }
      params.push(`${key}=${value}`);
    }
    return params.join("&");
  }

  render() {
    // window.location.hash = "#" + this.getParamString();
    console.log(this.getParamString());
    return <div className="setup">
      <h1>Setup</h1>
      Here you can configure the Kali Linux simulation. Or just skip this step by
      pressing the <code>start</code> button.
      Fields marked with a "?" can be left empty to diable said feature.

      <button onClick={() => start(this.state.settings, true)}>Skip setup</button>

      <h2>General settings</h2>
      {this.renderSettings(GENERIC_EDIT_FIELDS)}

      <h2>Timing settings</h2>
      All values below are measured in seconds. Negative values are not allowed.
      {this.renderSettings(TIMING_FIELDS)}

      <button onClick={() => start(this.state.settings, true)}>Start</button>
    </div>
  }

  renderSettings(list: InputDescription[]) {
    return <div className="settings">
      {list.map(this.renderGenericSetting)}
    </div>
  }

  renderGenericSetting = (setting: InputDescription) => {
    let value = this.state.settings[setting.settingsName];
    let errorMessage = setting.checkForErrors(value);
    let dom;
    if (setting.createInputDom) {
      dom = setting.createInputDom(setting, value);
    } else {
      let onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        let copy = { ...this.state.settings };
        copy[setting.settingsName] = e.target.value;
        this.setState({ settings: copy });
      }
      let className = errorMessage ? "has-error" : undefined;
      dom = <input className={className} onChange={onChangeCallback} value={value} />
    }
    return this.renderSetting(setting.title, dom, errorMessage);
  }

  renderSetting(title: string, inputDom: any, errorMessage: string | null) {
    return <div key={title} className="setting">
      <div className="label">
        {title}
      </div>
      <div className="value-and-error">
        <div className="value">
          {inputDom}
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  }
}

function start(settings: Settings, alertOnError: boolean) {
  for (let setting of GENERIC_EDIT_FIELDS) {
    let value = settings[setting.settingsName];
    let errorMessage = setting.checkForErrors(value);
    if (errorMessage) {
      let message = `The value you supplied for "${setting.title}" is not valid!`;
      console.log(message);
      alertOnError && alert(message);
      return false;
    }
  }

  let copy = { ...DEFAULT_CONSTANTS };
  copy.hostname = settings.hostname;
  copy.initialScreen = C.SCREEN_LOGIN;
  //settings
  copy.kernelLoadDuration = Number(settings.kernelLoadDuration);
  copy.initrdLoadDuration = Number(settings.initrdLoadDuration);
  copy.plymountDuration = Number(settings.plymountDuration);
  copy.shutdownDuration = Number(settings.shutdownDuration);

  initialSetup(copy);
  return true;
}

interface State {
  settings: Settings,
}

interface Settings {
  hostname: string,
  bootTimeout: string,
  cryptDevice: string,
  //timing
  kernelLoadDuration: string,
  initrdLoadDuration: string,
  plymountDuration: string,
  shutdownDuration: string,
  // server verification
  checkLoginCredentialsUrl: string,
  checkDecryptionPasswordUrl: string,
  serverRequestTimeout: string,
  // local verification
  validLoginUsernameRegex: string,
  validLoginPasswordRegex: string,
  validDecryptionPasswordRegex: string,

  [key: string]: string,
}

interface Props {
}

interface InputDescription {
  title: string,
  settingsName: string,
  checkForErrors: (value: string) => string | null,
  createInputDom?: (self: InputDescription, value: string) => any;
}

export default ScreenSetup;
