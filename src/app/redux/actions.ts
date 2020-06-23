//Needs to be here to prevent cyclic references
import store from './store';
import * as C from './constants';

function d(action: Action) {
  store.dispatch(action);
}

// actions
export interface ActionWithoutPayload {
  type: string,
}

export interface SetStringAction {
  type: string,
  payload: string,
}

export interface SetNumberAction {
  type: string,
  payload: number,
}

export interface OptionalStringAction {
  type: string,
  payload?: string,
}


export type Action = ActionWithoutPayload | SetStringAction |
OptionalStringAction | SetNumberAction;

// action creators
export function setLoginUsername(newValue: string) {
  d({
    type: C.SET_LOGIN_USERNAME,
    payload: newValue,
  });
}

export function setLoginPassword(newValue: string) {
  d({
    type: C.SET_LOGIN_PASSWORD,
    payload: newValue,
  });
}

export function tryLogin() {
  d({
    type: C.TRY_LOGIN,
  });
}

export function setLoginOpenMenu(newValue?: string) {
  d({
    type: C.SET_LOGIN_OPEN_MENU,
    payload: newValue,
  });
}

export function setHostname(newValue: string) {
  d({
    type: C.SET_HOSTNAME,
    payload: newValue,
  });
}

export function setScreen(newValue: string) {
  d({
    type: C.SET_SCREEN,
    payload: newValue,
  });
}

export function setGrubMainSelectedIndex(newValue: number) {
  d({
    type: C.SET_GRUB_MAIN_SELECTED,
    payload: newValue,
  });
}

export function setGrubAdvancedSelectedIndex(newValue: number) {
  d({
    type: C.SET_GRUB_ADVANCED_SELECTED,
    payload: newValue,
  });
}

export function setKernelAndBoot(kernelName: string){
  d({
    type: C.SET_KERNEL_AND_BOOT,
    payload: kernelName,
  });
}
