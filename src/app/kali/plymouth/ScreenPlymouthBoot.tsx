import React from 'react';
import { setScreen } from '../../redux/actions';
import * as C from '../../redux/constants';
import store from '../../redux/store';
import { PlymouthLogoBooting } from './PlymouthBootAnimation';

export default class ScreenPlymouthBoot extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { progress: 0 };
  }

  render() {
    return <div className="screen-plymouth-boot plymouth v-flex">
      <div className="expand"></div>
      <PlymouthLogoBooting progress={this.state.progress} />
      <div className="expand">
        {C.DEBUG &&
          <div style={{ color: "white", margin: "auto", textAlign: "center" }}>
            Progress: {Math.round(100 * this.state.progress)}%
          </div>
        }
      </div>
    </div>
  }

  componentDidMount() {
    (this as any).myInterval = setInterval(this.update, 30);
    (this as any).startDate = Date.now();
    (this as any).duration = Math.round(1000 * store.getState().const.plymountDuration);
  }

  componentWillUnmount() {
    clearInterval((this as any).myInterval);
  }

  update = () => {
    let now = Date.now();
    let start: number = (this as any).startDate;
    let duration: number = (this as any).duration;
    let end = start + duration;
    if (now < end) {
      let progress = (now - start) / duration;
      this.setState({ progress: progress });
    } else {
      setScreen(C.SCREEN_LOGIN);
    }
  }
}

interface Props {
}

interface State {
  progress: number,
}
