import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables } from '../store';


export default function reducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
  switch (action.type) {
    case C.SET_DECRYPT_PASSWORD: {
      let payload = action.payload as string;
      return {
        ...state,
        decrypt: {
          ...state.decrypt,
          password: payload,
        },
      };
    }
    case C.TRY_DECRYPT: {
      let success = action.payload as boolean;
      let newScreen;
      if (success) {
        newScreen = {
          name: C.SCREEN_PLYMOUTH_BOOT,
          changeTime: new Date(),
        };
      }
      return {
        ...state,
        decrypt: {
          ...state.decrypt,
          failed: !success,
          attempts: state.decrypt.attempts + 1,
        },
        screen: newScreen || state.screen,
      };
    }
    default: {
      return state;
    }
  }
}
