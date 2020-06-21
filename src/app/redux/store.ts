import { createStore } from 'redux';
import { reducer } from './reducer';

export interface ReduxState {
  hostname: string,
  screen: string,
  username: string,
  password: string,
}

export const fallbackState: ReduxState = {
  hostname: "Kali Linux",
  screen: "login",
  username: "",
  password: "",
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
