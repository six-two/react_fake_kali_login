import React from 'react';
import * as C from '../redux/constants';

export interface RenderInputProps {
  value: string,
  setValue: (value: string) => void,
}

export function renderInput(type: string, value: string, onValueChange: (value: string) => void): JSX.Element {
  switch (type) {
    case C.TYPE_STRING:
    case C.TYPE_STRING_OR_NULL:
    case C.TYPE_TIMEOUT: {
      return <StringInputView value={value} setValue={onValueChange} />
    }
    default:
      console.error(`Unknown type: "${type}"`)
      return <div>ERROR</div>;
  }
}

export function checkInput(type: string, value: string): string | null {
  switch (type) {
    case C.TYPE_STRING: {
      if (!value.trim()) {
        return "Empty field is not allowed";
      }
      return null;
    }
    case C.TYPE_STRING_OR_NULL: {
      return null;
    }
    case C.TYPE_TIMEOUT: {
      return checkTimingStringForErrors(value);
    }
    default:
      console.error(`Unknown type: "${type}"`)
      return "Internal error: unknown type";
  }
}


function StringInputView(props: RenderInputProps): JSX.Element {
  let onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.target.value);
  }
  return <input value={props.value} onChange={onChangeCallback} />
}


function checkTimingStringForErrors(value: string): string | null {
  if (!value.trim()) {
    return "Empty field is not allowed";
  }
  let number = Number(value);
  if (isNaN(number)) {
    return "Not a valid number";
  }
  if (number < 0) {
    return "Number can not be negative";
  }
  return null;
}

function checkNonEmptyStringForErrors(string: string): string | null {
  if (!string.trim()) {
    return "Empty field is not allowed";
  }
  return null;
}
