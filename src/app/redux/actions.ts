// action types
export const SET_USERNAME = "SET_USERNAME";

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
export function setUsername(format: string): SetStringAction {
  return {
    type: SET_USERNAME,
    payload: format,
  };
}
