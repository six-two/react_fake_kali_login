//Needs to be here to prevent cyclic references
import store, { ReduxConstants } from './store';
import * as C from './constants';

function d(action: Action) {
  store.dispatch(action);
}

export interface Action {
  type: string,
  payload?: string | number | SetKernelAndBootPayload | ReduxConstants | null,
};

export interface SetKernelAndBootPayload {
  title: string,
  kernel: string,
}

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

export function setLoginOpenMenu(newValue: string | null) {
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

export function setKernelAndBoot(entryName: string, kernelName: string) {
  d({
    type: C.SET_KERNEL_AND_BOOT,
    payload: { title: entryName, kernel: kernelName },
  });
}

export function initialSetup(constants: ReduxConstants) {
  d({
    type: C.INITIAL_SETUP,
    payload: constants,
  });
}

export function resetState() {
  d({ type: C.RESET_STATE });
}
