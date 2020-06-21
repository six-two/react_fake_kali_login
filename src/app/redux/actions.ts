// action types
export const SET_USERNAME = "SET_USERNAME";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_SCREEN = "SET_SCREEN";
export const SET_HOSTNAME = "SET_HOSTNAME";

// screens
export const SCREEN_OFF = "SCREEN_OFF";
export const SCREEN_HIBERNATE = "SCREEN_HIBERNATE";
export const SCREEN_SUSPEND = "SCREEN_SUSPEND";
export const SCREEN_LOGIN = "SCREEN_LOGIN";

// actions
export interface ActionWithoutPayload {
  type: string,
}

export interface SetStringAction {
  type: string,
  payload: string,
}

export type Action = ActionWithoutPayload | SetStringAction;

// action creators
export function setUsername(newValue: string): SetStringAction {
  return {
    type: SET_USERNAME,
    payload: newValue,
  };
}

export function setPassword(newValue: string): SetStringAction {
  return {
    type: SET_PASSWORD,
    payload: newValue,
  };
}

export function setHostname(newValue: string): SetStringAction {
  return {
    type: SET_HOSTNAME,
    payload: newValue,
  };
}

export function setScreen(newValue: string): SetStringAction {
  return {
    type: SET_SCREEN,
    payload: newValue,
  };
}
