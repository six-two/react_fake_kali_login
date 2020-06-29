import React from 'react';
import * as C from '../redux/constants';
import Dropdown from '../Dropdown';

const INITIAL_SCREEN_MAP = new Map<string, string>();
INITIAL_SCREEN_MAP.set(C.SCREEN_LOGIN, "Login");
INITIAL_SCREEN_MAP.set(C.SCREEN_GRUB, "Grub");

export interface RenderInputProps {
  value: string,
  setValue: (value: string) => void,
}

export function allowsEmptyInput(type: string): boolean {
  if (type === C.TYPE_STRING_OR_NULL || type === C.TYPE_TIMEOUT_OR_NULL
    || type === C.TYPE_TEMPLATE_URL_PASS || type === C.TYPE_TEMPLATE_URL_USER_PASS) {
    return true;
  }
  return false;
}

export function renderInput(type: string, value: string, onValueChange: (value: string) => void): JSX.Element {
  switch (type) {
    case C.TYPE_STRING:
    case C.TYPE_STRING_OR_NULL:
    case C.TYPE_TIMEOUT:
    case C.TYPE_TIMEOUT_OR_NULL:
    case C.TYPE_TEMPLATE_URL_PASS:
    case C.TYPE_TEMPLATE_URL_USER_PASS: {
      return <StringInputView value={value} setValue={onValueChange} />
    }
    case C.TYPE_INITIAL_SCREEN: {
      return <Dropdown value={value} onValueChange={onValueChange} optionMap={INITIAL_SCREEN_MAP} />;
    }
    default:
      console.error(`Unknown type: "${type}"`)
      return <div>ERROR: Unknown input type</div>;
  }
}

function StringInputView(props: RenderInputProps): JSX.Element {
  let onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.target.value);
  }
  return <input value={props.value} onChange={onChangeCallback} />
}

export function checkInput(type: string, value: string): string | null {
  if (!allowsEmptyInput(type) && !value) {
    return "Empty field is not allowed";
  }
  switch (type) {
    case C.TYPE_STRING:
    case C.TYPE_STRING_OR_NULL: {
      return null;
    }
    case C.TYPE_TIMEOUT_OR_NULL:
    case C.TYPE_TIMEOUT: {
      if (type === C.TYPE_TIMEOUT_OR_NULL && !value) {
        return null;
      }
      return checkTimingStringForErrors(value);
    }
    case C.TYPE_INITIAL_SCREEN: {
      if (!INITIAL_SCREEN_MAP.has(value)) {
        return `Not a valid initial screen: "${value}"`;
      }
      return null;
    }
    case C.TYPE_TEMPLATE_URL_PASS:
    case C.TYPE_TEMPLATE_URL_USER_PASS: {
      let placeholders = [C.PLACEHOLDER_PASSWORD];
      if (type === C.TYPE_TEMPLATE_URL_USER_PASS) {
        placeholders.push(C.PLACEHOLDER_USERNAME);
      }
      return checkUrlForPlaceholders(value, placeholders);
    }
    default:
      console.error(`Unknown type: "${type}"`)
      return "Internal error: unknown type";
  }
}

function checkTimingStringForErrors(value: string): string | null {
  let number = Number(value);
  if (isNaN(number)) {
    return "Not a valid number";
  }
  if (number < 0) {
    return "Number can not be negative";
  }
  return null;
}

function checkUrlForPlaceholders(urlText: string, placeholders: string[]) {
  try {
    let url = new URL(urlText);
    for (let p of placeholders){
      if (urlText.indexOf(p) < 0){
        return `The url should contain the placeholder "${p}"`;
      }
    }
    return null;
  } catch (e) {
    console.debug("This error is probably related to url parsing",e);
    return "Unvalid URL format";
  }
}
