import React from 'react';
import { setScreen } from '../../redux/actions';
import * as C from '../../redux/constants';
import { iconShutdownDialog, iconRebootDialog } from '../../Images';


function GenericConfirmDialog(props: Props) {
  return <div className="shutdown-dialog">
    <div className="top h-flex">
      <img className="icon" alt="" src={props.icon} />
      <div className="content expand">
        <div className="title">{props.title}</div>
        <div className="text">{props.message}</div>
      </div>
    </div>
    <div className="buttons h-flex">
      <div className="expand"></div>
      <button type="button" onClick={props.onCancel}>Cancel</button>
      <button type="button" onClick={props.onConfirm}>{props.confirmButtonText}</button>
    </div>
  </div>
}


interface Props {
  title: string,
  message: string,
  icon: string,
  confirmButtonText: string,
  onConfirm: () => void,
  onCancel: () => void,
}

export function RebootConfirmDialog() {
  return <GenericConfirmDialog
    title="Restart"
    message="Are you sure you want to close all programs and restart the computer?"
    icon={iconRebootDialog}
    confirmButtonText="Restart"
    onConfirm={() => setScreen(C.SCREEN_REBOOT)}
    onCancel={() => setScreen(C.SCREEN_LOGIN)}
  />
}

export function ShutdownConfirmDialog() {
  return <GenericConfirmDialog
    title="Shut Down"
    message="Are you sure you want to close all programs and shut down the computer?"
    icon={iconShutdownDialog}
    confirmButtonText="Shut Down"
    onConfirm={() => setScreen(C.SCREEN_SHUTDOWN)}
    onCancel={() => setScreen(C.SCREEN_LOGIN)}
  />
}
