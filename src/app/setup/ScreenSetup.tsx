import React from 'react';
import { DEFAULT_CONSTANTS } from '../redux/store';
import * as C from '../redux/constants';
import { initialSetup } from '../redux/actions';
import Setting from './Setting';
import { Settings } from './State';
import { renderInput, checkInput } from './SettingsInput';
import { SettingsInfo, FIELDS_GENERAL, FIELDS_TIMING } from './SettingInfos';
import { isValid, parseSettings, defaultSettings, parseUrl } from './State';


//TODO signal which fields can be left empty
//TODO add descriptions
class ScreenSetup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      settings: defaultSettings(),
    };
  }

  componentDidMount() {
    let parsed = parseUrl(this.state.settings);
    if (parsed) {
      this.setState({ settings: parsed.settings });
      if (parsed.skipSetup) {
        console.log("Trying to skip setup");
        start(parsed.settings, false);
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
      {this.renderSettings(FIELDS_GENERAL)}

      <h2>Timing settings</h2>
      All values below are measured in seconds. Negative values are not allowed.
      {this.renderSettings(FIELDS_TIMING)}

      <button onClick={() => start(this.state.settings, true)}>Start</button>
    </div>
  }

  renderSettings(list: SettingsInfo[]) {
    return <div className="settings">
      {list.map(this.renderGenericSetting)}
    </div>
  }

  renderGenericSetting = (setting: SettingsInfo) => {
    let value = this.state.settings[setting.name];
    let errorMessage = checkInput(setting.type, value);
    let onChangeCallback = (newValue: string) => {
      let copy = { ...this.state.settings };
      copy[setting.name] = newValue;
      this.setState({ settings: copy });
    }

    return <Setting name={setting.title} errorMessage={errorMessage}>
      {renderInput(setting.type, value, onChangeCallback)}
    </Setting>
  }
}

function start(settings: Settings, alertOnError: boolean) {
  if (isValid(settings)) {
    let constants = parseSettings(settings);
    initialSetup(constants);
    return true;
  } else {
    if (alertOnError) {
      alert("Please check your inputs. At least one of them has an invalid value");
    }
    return false;
  }
}

interface State {
  settings: Settings,
}

interface Props {
}

export default ScreenSetup;
