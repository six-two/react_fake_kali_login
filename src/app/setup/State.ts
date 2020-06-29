import { ReduxConstants, DEFAULT_CONSTANTS } from '../redux/store';
import * as C from '../redux/constants';
import { SETTINGS_MAP } from './SettingInfos';
import { checkInput } from './Types';

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

export function asSettings(constants: ReduxConstants): Settings {
  return {
    hostname: constants.hostname,
    // defaultKernel: constants.defaultKernel,
    //kernels: make nice list with up down add, default?
    bootTimeout: constants.bootTimeout ? "" + constants.bootTimeout : "",
    cryptDevice: constants.cryptDevice || "",
    initialScreen: C.SCREEN_LOGIN,
    //timing
    kernelLoadDuration: "" + constants.kernelLoadDuration,
    initrdLoadDuration: "" + constants.initrdLoadDuration,
    plymountDuration: "" + constants.plymountDuration,
    shutdownDuration: "" + constants.shutdownDuration,
    // server verification
    checkLoginCredentialsUrl: constants.checkLoginCredentialsUrl || "",
    checkDecryptionPasswordUrl: constants.checkDecryptionPasswordUrl || "",
    serverRequestTimeout: "" + constants.serverRequestTimeout,
    // local verification
    validLoginUsernameRegex: constants.validLoginUsernameRegex.source,
    validLoginPasswordRegex: constants.validLoginPasswordRegex.source,
    validDecryptionPasswordRegex: constants.validDecryptionPasswordRegex.source,
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
  constants.bootTimeout = settings.bootTimeout ? Number(settings.bootTimeout) : null;
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