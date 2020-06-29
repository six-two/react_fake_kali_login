import React from 'react';

export default function Setting(props: Props) {
  let hasErrorClass = props.errorMessage ? " has-error" : "";
  return <div className="setting">
    <div className="label">
      {props.name}
    </div>
    <div className={"value-and-error" + hasErrorClass}>
      <div className="value">
        {props.children}
      </div>
      {props.errorMessage &&
        <div className="error">
          {props.errorMessage}
        </div>
      }
    </div>
  </div>
}

interface Props {
  name: string,
  errorMessage?: string | null,
  children: any,
}
