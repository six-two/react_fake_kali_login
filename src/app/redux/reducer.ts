import * as Actions from './actions';
import * as C from './constants';
import {
  ReduxState, ReduxVariables, ReduxConstants, FALLBACK_STATE, DEFAULT_VARIABLES
} from './store';
import loginReducer from './reducers/login';
import grubReducer from './reducers/grub';

export function reducer(state: ReduxState | undefined, action: Actions.Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = FALLBACK_STATE;
  }

  return {
    const: state.const,
    var: varReducer(state.var, action, state.const),
  }
}


function varReducer(state: ReduxVariables, action: Actions.Action, constants: ReduxConstants): ReduxVariables {
  state = loginReducer(state, action);
  state = grubReducer(state, action);
  state = miscReducer(state, action, constants);
  return state;
}

function miscReducer(state: ReduxVariables, action: Actions.Action, constants: ReduxConstants): ReduxVariables {
  switch (action.type) {
    case C.SET_SCREEN: {
      let newScreen = action.payload as string;

      // skip password if no crypt device exists
      if (newScreen === C.SCREEN_PLYMOUTH_PASSWORD && !constants.cryptDevice) {
        newScreen = C.SCREEN_PLYMOUTH_BOOT;
      }

      // Handle reboots
      let rebootAfterShutdown = false;
      if (newScreen === C.SCREEN_REBOOT) {
        rebootAfterShutdown = true;
        newScreen = C.SCREEN_SHUTDOWN;
      }

      // Handle suspends
      let screenBeforeSuspend = newScreen === C.SCREEN_SUSPEND ?
        state.screen.name : null;

      return {
        ...state,
        screen: {
          name: newScreen,
          changeTime: new Date(),
        },
        rebootAfterShutdown: rebootAfterShutdown,
        screenBeforeSuspend: screenBeforeSuspend,
      };
    }
    case C.RESET_STATE: {
      let cleanState = DEFAULT_VARIABLES;
      return {
        ...cleanState,
        screen: {
          ...cleanState.screen,
          changeTime: new Date(),
        },
      };
    }
  }
  return state;
}

export default reducer;
