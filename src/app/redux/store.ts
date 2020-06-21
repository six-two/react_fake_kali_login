import { createStore } from 'redux';
import { reducer } from './reducer';
import { SCREEN_LOGIN } from './constants';

export interface ReduxState {
  hostname: string,
  screen: ScreenState,
  username: string,
  password: string,
  suspend: {
    lastScreen?: string,
  }
}

export interface ScreenState {
  name: string,
  changeTime: Date,
}

export const fallbackState: ReduxState = {
  hostname: "Kali Linux",
  screen: {
    name: SCREEN_LOGIN,
    changeTime: new Date(),
  },
  username: "",
  password: "",
  suspend: {},
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
