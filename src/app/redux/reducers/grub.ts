import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables } from '../store';


export default function reducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
  switch (action.type) {
    case C.SET_GRUB_MAIN_SELECTED: {
      let payload = action.payload as number;
      return {
        ...state,
        grub: {
          ...state.grub,
          selectionInMain: payload,
          showTimeout: false,
        },
      };
    }
    case C.SET_GRUB_ADVANCED_SELECTED: {
      let payload = action.payload as number;
      return {
        ...state,
        grub: {
          ...state.grub,
          selectionInAdvanced: payload,
          showTimeout: false,
        },
      };
    }
    case C.SET_KERNEL_AND_BOOT: {
      let payload = action.payload as string;
      return {
        ...state,
        grub: {
          ...state.grub,
          kernel: payload,
          showTimeout: false,
        },
        screen: {
          name: C.SCREEN_LOGIN,//TODO DBG
          changeTime: new Date(),
        },
      };
    }
    default: {
      return state;
    }
  }
}
