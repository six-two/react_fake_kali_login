import { createStore } from 'redux';
import { reducer } from './reducer';
import { SCREEN_LOGIN } from './actions';

export interface ReduxState {
  hostname: string,
  screen: string,
  username: string,
  password: string,
}

export const fallbackState: ReduxState = {
  hostname: "Kali Linux",
  screen: SCREEN_LOGIN,
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
export default store;
