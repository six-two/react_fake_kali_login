import * as Actions from './actions';
import * as C from './constants';
import { ReduxState, ReduxVariables, FALLBACK_STATE } from './store';
import loginReducer from './reducers/login';
import grubReducer from './reducers/grub';

export function reducer(state: ReduxState | undefined, action: Actions.Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = FALLBACK_STATE;
  }

  return {
    const: state.const,
    var: varReducer(state.var, action),
  }
}


function varReducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
  state = loginReducer(state, action);
  state = grubReducer(state, action);
  switch (action.type) {
    case C.SET_SCREEN: {
      let newScreen = action.payload as string;

      return {
        ...state,
        screen: {
          name: newScreen,
          changeTime: new Date(),
        },
        screenBeforeSuspend: newScreen === C.SCREEN_SUSPEND ?
          state.screen.name : null
      };
    }
  }
  return state;
}

export default reducer;
