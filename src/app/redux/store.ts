import { createStore } from 'redux';
import { reducer } from './reducer';
import { SCREEN_LOGIN } from './constants';

export interface ReduxState {
  hostname: string,
  screen: ScreenState,
  login: LoginState,
  suspend: {
    lastScreen?: string,
  },
  isFinished: boolean,
}

export interface ScreenState {
  name: string,
  changeTime: Date,
}

export interface LoginState {
  username: string,
  password: string,
  openMenu?: string,
  failed: boolean,
  count: number,
}

export const fallbackState: ReduxState = {
  hostname: "Kali Linux",
  screen: {
    name: SCREEN_LOGIN,
    changeTime: new Date(),
  },
  login: {
    username: "",
    password: "",
    failed: false,
    count: 0,
  },
  suspend: {},
  isFinished: false,
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
