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


export type Action = ActionWithoutPayload | SetStringAction;

// action creators
export function setUsername(newValue: string) {
  d({
    type: C.SET_USERNAME,
    payload: newValue,
  });
}

export function setPassword(newValue: string): SetStringAction {
  return {
    type: C.SET_PASSWORD,
    payload: newValue,
  };
}

export function setHostname(newValue: string): SetStringAction {
  return {
    type: C.SET_HOSTNAME,
    payload: newValue,
  };
}

export function setScreen(newValue: string) {
  d({
    type: C.SET_SCREEN,
    payload: newValue,
  });
}
