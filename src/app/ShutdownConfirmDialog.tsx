import React from 'react';

export default class ShutdownConfirmDialog extends React.Component<Props> {
  render() {
    return <div className="shutdown-dialog">
      <div className="top h-flex">
        <img className="icon" alt="" src={this.props.icon} />
        <div className="content expand">
          <div className="title">{this.props.title}</div>
          <div className="text">{this.props.message}</div>
        </div>
      </div>
      <div className="buttons h-flex">
        <div className="expand"></div>
        <button type="button" onClick={this.props.onCancel}>Cancel</button>
        <button type="button" onClick={this.props.onConfirm}>{this.props.confirmButtonText}</button>
      </div>
    </div>
  }
}

interface Props {
  title: string,
  message: string,
  icon: string,
  confirmButtonText: string,
  onConfirm: () => void,
  onCancel: () => void,
}
