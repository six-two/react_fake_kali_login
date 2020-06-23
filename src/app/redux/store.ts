import { createStore } from 'redux';
import { reducer } from './reducer';
import * as C from './constants';

//TODO separate constant settings from dynamic state

export interface ReduxState {
  hostname: string,
  screen: ScreenState,
  login: LoginState,
  suspend: {
    lastScreen?: string,
  },
  boot: BootState,
  decrypt: DecryptState,
  isFinished: boolean,
}

export interface ScreenState {
  name: string,
  changeTime: Date,
}

export interface LoginState {
  username: string,
  password: string,
  openMenu?: string,
  failed: boolean,
  count: number,
}

export interface BootState {
  kernel: {
    used?: string,
    default: string,
    advancedOptions: string[],
  },
  timeoutStart?: Date,
  timeout: number,
  selectedMain: number,
  selectedAdvanced: number,
}

export interface DecryptState {
    isEncrypted: boolean,
    password: string,//The password the user typed
    cryptDeviceName: string,
}

export const fallbackState: ReduxState = {
  hostname: "Kali Linux",
  screen: {
    name: C.SCREEN_GRUB,//DBG
    changeTime: new Date(),
  },
  login: {
    username: "",
    password: "",
    failed: false,
    count: 0,
  },
  boot: {
    kernel: {
      default: "5.6.0-kali2",
      advancedOptions: ["5.6.0-kali2", "5.6.0-kali1"],
    },
    selectedMain: 0,
    selectedAdvanced: 0,
    timeout: 5,
  },
  decrypt: {
    isEncrypted: false,
    password: "",
    cryptDeviceName: "sda3_crypt",
  },
  suspend: {},
  isFinished: false,
}

let devTools = undefined;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  // Redux dev tools are available
  let devToolOptions = {
    trace: false,
    traceLimit: 25
  };
  devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__(devToolOptions);
}

export const store = createStore(reducer, fallbackState, devTools);
export default store;
