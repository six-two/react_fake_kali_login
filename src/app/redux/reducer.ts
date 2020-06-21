import * as Actions from './actions';
import * as C from './constants';
import { ReduxState, fallbackState } from './store';

export function reducer(state: ReduxState | undefined, action: Actions.Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  switch (action.type) {
    case C.SET_USERNAME: {
      let payload = (action as Actions.SetStringAction).payload;
      return {
        ...state,
        username: payload,
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
