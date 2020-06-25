import { ReduxState } from './redux/store';
import * as C from './redux/constants';


export async function isLoginValid(state: ReduxState) {
  let username = state.var.login.username;
  let password = state.var.login.password;
  let url = state.const.checkLoginCredentialsUrl;

  if (url !== null) {
    // query the url to check password
    let serverResponse = await checkCredentialsViaServer(url, username, password);
    if (serverResponse !== null) {
      // got a valid server response
      return serverResponse;
    }
  }
  // use regexes to check validity
  let validUsername = Boolean(username.match(state.const.validLoginUsernameRegex));
  let validPassword = Boolean(password.match(state.const.validLoginPasswordRegex));
  console.log(`Comparing login credentials to regex.\n - validUsername: ${validUsername}\n - validPassword: ${validPassword}`);
  return validUsername && validPassword;
}

export async function isDecryptPasswordValid(state: ReduxState) {
  let password = state.var.decrypt.password;
  let url = state.const.checkDecryptionPasswordUrl;

  if (url !== null) {
    // query the url to check password
    let serverResponse = await checkCredentialsViaServer(url, null, password);
    if (serverResponse !== null) {
      // got a valid server response
      return serverResponse;
    }
  }
  // use regex to check validity
  let validPassword = Boolean(password.match(state.const.validDecryptionPasswordRegex));
  console.log(`Comparing decrypt password to regex. Match: ${validPassword}`);
  return validPassword;
}

async function checkCredentialsViaServer(urlTemplate: string, username: string | null,
  password: string) {
  let url = urlTemplate.replace(C.PLACEHOLDER_PASSWORD, password);
  if (username !== null) {
    url = url.replace(C.PLACEHOLDER_USERNAME, username);
  }

  console.log(`Checking credentials via url: "${url}"`)
  let response = await http<VerifyCredentialsResponse>(url);

  const isValid = response && response.isValid !== undefined ? response.isValid : null;
  console.log("Server response:", isValid);
  return isValid;
}

async function http<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP request failed: url="${url}" response_status: "${response.statusText}"`);
      return null;
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface VerifyCredentialsResponse {
  isValid: boolean,
}
