import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables, ReduxConstants } from '../store';


export default function reducer(state: ReduxVariables, action: Actions.Action, constants: ReduxConstants): ReduxVariables {
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
      let nextScreen = constants.cryptDevice ? C.SCREEN_PLYMOUTH_PASSWORD
        : C.SCREEN_PLYMOUTH_BOOT;
      return {
        ...state,
        grub: {
          ...state.grub,
          kernel: payload,
          showTimeout: false,
        },
        screen: {
          name: nextScreen,
          changeTime: new Date(),
        },
      };
    }
    default: {
      return state;
    }
  }
}
