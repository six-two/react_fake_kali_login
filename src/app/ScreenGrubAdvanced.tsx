import React from 'react';
import { connect } from 'react-redux';
import {
  setScreen, setGrubAdvancedSelectedIndex, setKernelAndBoot
} from './redux/actions';
import * as C from './redux/constants';
import { ReduxState } from './redux/store';
import ScreenGrub from './ScreenGrub';

const TEMPLATE_BASE = "Kali GNU/Linux, with Linux %s";
const TEMPLATES = [TEMPLATE_BASE, TEMPLATE_BASE + " (recovery mode)"];

class ScreenGrubAdvanced extends React.Component<Props> {
  render() {
    let entries = [];
    for (let kernel of this.props.kernels) {
      for (let template of TEMPLATES) {
        let title = template.replace("%s", kernel)
        entries.push({
          title: title,
          onSelected: () => setKernelAndBoot(title, kernel),
        });
      }
    }
    return <ScreenGrub
      entries={entries}
      onBack={() => setScreen(C.SCREEN_GRUB_MENU)}
      selected={this.props.selected}
      setSelectedIndex={setGrubAdvancedSelectedIndex} />
  }
}

interface Props {
  selected: number,
  kernels: string[],
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    selected: state.var.grub.selectionInAdvanced,
    kernels: state.const.kernelList,
  };
};

const ReduxScreenGrubAdvanced = connect(mapStateToProps)(ScreenGrubAdvanced);
export default ReduxScreenGrubAdvanced;
