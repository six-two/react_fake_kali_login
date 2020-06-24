import React from 'react';
import { DEFAULT_CONSTANTS } from './redux/store';
import * as C from './redux/constants';
import { initialSetup } from './redux/actions';

const GENERIC_EDIT_FIELDS: InputDescription[] = [{
  title: "Hostname",
  settingsName: "hostname",
  checkForErrors: (value: string) => { return null; },
}];

class ScreenSetup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      settings: {
        hostname: DEFAULT_CONSTANTS.hostname,
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
        if (key === "setup") {
          setup = value; //if multiple definitions: only keep the last value
        } else {
          if (settings[key] !== undefined) {
            console.log(`Using url parameter: ${key}`);
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

  render() {
    return <div className="screen-setup">
      {GENERIC_EDIT_FIELDS.map(this.renderGenericSetting)}

      <button onClick={() => start(this.state.settings, true)}>Start</button>
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

  initialSetup(copy);
  return true;
}

interface State {
  settings: Settings,
}

interface Settings {
  hostname: string,
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
