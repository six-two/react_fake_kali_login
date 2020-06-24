import React from 'react';
import { ReduxState, ReduxConstants, DEFAULT_CONSTANTS } from './redux/store';
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
    // TODO read params from url
    // if url.params['setup'] === 'skip', call this.start(false) immediately
  }

  render() {
    return <div className="screen-setup">
      {GENERIC_EDIT_FIELDS.map(this.renderGenericSetting)}

      <button onClick={() => this.start(true)}>Start</button>
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
    return <div className="setting">
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

  start(alertOnError: boolean) {
    for (let setting of GENERIC_EDIT_FIELDS) {
      let value = this.state.settings[setting.settingsName];
      let errorMessage = setting.checkForErrors(value);
      if (errorMessage) {
        let message = `The value you supplied for "${setting.title}" is not valid!`;
        console.log(message);
        alertOnError && alert(message);
        return;
      }
    }

    //TODO actully set redux stuff
    let copy = { ...DEFAULT_CONSTANTS };
    copy.hostname = this.state.settings.hostname;
    copy.initialScreen = C.SCREEN_LOGIN;//DBG

    initialSetup(copy);
  }
}

interface State {
  settings: {
    hostname: string,
    [key: string]: string,
  }
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
