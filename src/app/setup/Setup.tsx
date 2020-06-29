import React from 'react';
import { ReduxConstants } from '../redux/store';
import { initialSetup } from '../redux/actions';
import * as C from '../redux/constants';
import Setting from './Setting';
import { Settings } from './State';
import { renderInput, checkInput, allowsEmptyInput } from './Types';
import { SettingsInfo, FIELDS_GENERAL, FIELDS_TIMING } from './SettingInfos';
import { isValid, parseSettings, asSettings, parseUrl } from './State';


//TODO signal which fields can be left empty
//TODO add descriptions
class SetupView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      settings: asSettings(props.constants),
    };
  }

  componentDidMount() {
    let parsed = parseUrl(this.state.settings);
    if (parsed) {
      this.setState({ settings: parsed.settings });
      if (parsed.skipSetup) {
        console.log("Trying to skip setup");
        this.start(parsed.settings, false);
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
    // console.log(this.getParamString());
    return <div className="setup">
      <h1>Setup</h1>
      Here you can configure the Kali Linux simulation. Or just skip this step by
      pressing the <code>Start</code> button.
      Fields marked with a "{C.MARKER_CAN_BE_LEFT_EMPTY}" can be left empty to diable said feature.

      <button onClick={() => this.start(this.state.settings, true)}>Skip setup</button>

      <h2>General settings</h2>
      {this.renderSettings(FIELDS_GENERAL)}

      <h2>Timing settings</h2>
      All values below are measured in seconds. Negative values are not allowed.
      {this.renderSettings(FIELDS_TIMING)}

      <button onClick={() => this.start(this.state.settings, true)}>Start</button>
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
    let canBeEmpty = allowsEmptyInput(setting.type);
    let onChangeCallback = (newValue: string) => {
      let copy = { ...this.state.settings };
      copy[setting.name] = newValue;
      this.setState({ settings: copy });
    }

    return <Setting key={setting.name} name={setting.title}
      canBeEmpty={canBeEmpty} errorMessage={errorMessage}>
      {renderInput(setting.type, value, onChangeCallback)}
    </Setting>
  }

  start(settings: Settings, alertOnError: boolean) {
    if (isValid(settings)) {
      let constants = parseSettings(settings);
      window.location.hash = "";
      initialSetup(constants);
      return true;
    } else {
      if (alertOnError) {
        alert("Please check your inputs. At least one of them has an invalid value");
      }
      return false;
    }
  }
}


interface State {
  settings: Settings,
}

interface Props {
  constants: ReduxConstants,
}

export default SetupView;