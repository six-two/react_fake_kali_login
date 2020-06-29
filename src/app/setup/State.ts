import { ReduxConstants, DEFAULT_CONSTANTS } from '../redux/store';
import * as C from '../redux/constants';
import { SETTINGS_MAP } from './SettingInfos';
import { checkInput } from './SettingsInput';

export interface Settings {
  hostname: string,
  bootTimeout: string,
  cryptDevice: string,
  initialScreen: string,
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

export function defaultSettings(): Settings {
  return {
    hostname: DEFAULT_CONSTANTS.hostname,
    // defaultKernel: DEFAULT_CONSTANTS.defaultKernel,
    //kernels: make nice list with up down add, default?
    bootTimeout: "" + DEFAULT_CONSTANTS.bootTimeout,
    cryptDevice: DEFAULT_CONSTANTS.cryptDevice || "",
    initialScreen: C.SCREEN_LOGIN,
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
  };
}

export function isValid(settings: Settings): boolean {
  for (let [key, value] of Object.entries(settings)) {
    let info = SETTINGS_MAP.get(key);
    if (info) {
      let errorMessage = checkInput(info.type, value);
      if (errorMessage) {
        let message = `The value you supplied for "${key}" is not valid!`;
        console.log(message);
        return false;
      }
    } else {
      console.warn(`No input verification defined for "${key}"`);
    }
  }
  return true;
}

export function parseSettings(settings: Settings): ReduxConstants {
  let constants = { ...DEFAULT_CONSTANTS };
  constants.hostname = settings.hostname;
  constants.bootTimeout = Number(settings.bootTimeout);
  constants.initialScreen = settings.initialScreen;
  //timing
  constants.kernelLoadDuration = Number(settings.kernelLoadDuration);
  constants.initrdLoadDuration = Number(settings.initrdLoadDuration);
  constants.plymountDuration = Number(settings.plymountDuration);
  constants.shutdownDuration = Number(settings.shutdownDuration);
  return constants;
}

export function parseUrl(settings: Settings) {
  // edit a copy
  settings = { ...settings };
  // read url (hash) params
  // if hash has "setup=skip": immediately start the simulation
  let hash = window.location.hash;
  if (hash) {
    let setup;
    let params = new URLSearchParams(hash.substr(1));
    for (let [key, value] of params.entries()) {
      value = decodeURIComponent(value);
      if (value === "null") {
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
    return {
      settings: settings,
      skipSetup: setup === "skip"
    };
  }
  return null;
}
