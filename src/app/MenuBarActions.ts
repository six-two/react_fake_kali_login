import * as Actions from './redux/actions';
import store from "./redux/store";

const dispatch = store.dispatch;

function shutdown() {
  dispatch(Actions.showTurnedOffScreen());
}
