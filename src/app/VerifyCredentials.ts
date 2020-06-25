import { ReduxState } from './redux/store';

export const USERNAME_PLACEHOLDER = "<username>";
export const PASSWORD_PLACEHOLDER = "<password>";

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
  let validPassword = Boolean(username.match(state.const.validLoginPasswordRegex));
  console.log(`Comparing login credentials to regex.\n - validUsername: ${validUsername}\n - validPassword: ${validPassword}`);
  return validUsername && validPassword;
}

async function checkCredentialsViaServer(urlTemplate: string, username: string | null,
  password: string) {
  let url = urlTemplate.replace(PASSWORD_PLACEHOLDER, password);
  if (username !== null) {
    url = url.replace(USERNAME_PLACEHOLDER, username);
  }

  let response = await http<VerifyCredentialsResponse>(url);
  return response ? response.isValid : null;
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
