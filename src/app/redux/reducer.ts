import * as Actions from './actions';
import { ReduxState, fallbackState } from './store';

export function reducer(state: ReduxState | undefined, action: Actions.Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  switch (action.type) {
    case Actions.SET_USERNAME: {
      let payload = (action as Actions.SetStringAction).payload;
      return {
        ...state,
        username: payload,
      };
    }
  }
  return state;
}

export default reducer;
