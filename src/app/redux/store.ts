import { createStore } from 'redux';
import { reducer } from './reducer';
import * as C from './constants';

export interface ReduxState {
  const: ReduxConstants,
  var: ReduxVariables,
  isSetupDone: boolean,
}

// The settings that can be set by the user before the simulation is started
// They will not change over the course of the simulation
export interface ReduxConstants {
  hostname: string,
  defaultKernel: string,
  kernelList: string[],
  bootTimeout: number | null,
  cryptDevice: string | null,
  // Durations are measured in seconds (as floats)
  kernelLoadDuration: number,
  initrdLoadDuration: number,
  plymountDuration: number,
  shutdownDuration: number,
  // urls for logging / checking credentials
  checkLoginCredentialsUrl: string | null,
  checkDecryptionPasswordUrl: string | null,
  validLoginUsernameRegex: string,
  validLoginPasswordRegex: string,
  validDecryptionPasswordRegex: string,
  initialScreen: string,
}

export const DEFAULT_CONSTANTS: ReduxConstants = {
  hostname: "Kali Linux",
  defaultKernel: "5.6.0-kali2-amd64",
  kernelList: ["5.6.0-kali2-amd64", "5.6.0-kali1-amd64"],
  bootTimeout: 5,
  // cryptDevice: "sda3_crypt",
  cryptDevice: null,
  kernelLoadDuration: 0.2,
  initrdLoadDuration: 1.0,
  plymountDuration: 1.5,//DBG
  shutdownDuration: 2.0,
  //password stuff
  checkLoginCredentialsUrl: "https://my-json-server.typicode.com/six-two/react_fake_kali_login/login/valid",
  checkDecryptionPasswordUrl: "https://my-json-server.typicode.com/six-two/react_fake_kali_login/decrypt/invalid",
  validLoginUsernameRegex: ".+",//anything except empty string
  validLoginPasswordRegex: "^ $",//single space
  validDecryptionPasswordRegex: "^$",//empty string
  initialScreen: C.SCREEN_LOGIN,
}

// The variables or "state" of the simulation.
// Will be reset on reboot.
export interface ReduxVariables {
  screen: {
    name: string,
    changeTime: Date,
  },
  grub: {
    kernel: string,
    showTimeout: boolean,
    selectionInMain: number,
    selectionInAdvanced: number,
    selectedEntryName: string | null,
  },
  decrypt: {
    password: string,
  },
  login: {
    username: string,
    password: string,
    openMenu: string | null,
    failed: boolean,
    attempts: number,
  },
  rebootAfterShutdown: boolean,
  screenBeforeSuspend: string | null,
  isFinished: boolean,
}

export const DEFAULT_VARIABLES = {
  screen: {
    name: C.SCREEN_GRUB,
    changeTime: new Date(),
  },
  grub: {
    kernel: DEFAULT_CONSTANTS.defaultKernel,
    showTimeout: true,
    selectionInMain: 0,
    selectionInAdvanced: 0,
    selectedEntryName: null,
  },
  decrypt: {
    password: "",
  },
  login: {
    username: "",
    password: "",
    openMenu: null,
    failed: false,
    attempts: 0,
  },
  screenBeforeSuspend: null,
  rebootAfterShutdown: false,
  isFinished: false,
}

export const FALLBACK_STATE: ReduxState = {
  const: DEFAULT_CONSTANTS,
  var: DEFAULT_VARIABLES,
  isSetupDone: false,
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

export const store = createStore(reducer, FALLBACK_STATE, devTools);
export default store;
