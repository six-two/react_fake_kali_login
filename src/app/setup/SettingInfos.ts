import * as C from '../redux/constants';


export interface SettingsInfo {
  title: string,
  name: string,
  description: string,
  type: string,
}

const HOSTNAME: SettingsInfo = {
  title: "Hostname",
  name: "hostname",
  description: "The hostname of the kali linux. It is shown on the login screen.",
  type: C.TYPE_STRING,
};

const GRUB_GREETER_DURATION: SettingsInfo = {
  title: "Grub greeting message",
  name: "grubGreetingDuration",
  description: "",
  type: C.TYPE_TIMEOUT,
};

const KERNEL_DURATION: SettingsInfo = {
  title: "Kernel load",
  name: "kernelLoadDuration",
  description: "",
  type: C.TYPE_TIMEOUT,
};

const INITRD_DURATION: SettingsInfo = {
  title: "Initial ramdisk load",
  name: "initrdLoadDuration",
  description: "",
  type: C.TYPE_TIMEOUT,
};

const BOOT_LOGO_DURATION: SettingsInfo = {
  title: "Kali logo (boot)",
  name: "plymountDuration",
  description: "",
  type: C.TYPE_TIMEOUT,
};

const SHUTDOWN_LOGO_DURATIION: SettingsInfo = {
  title: "Kali logo (shutdown)",
  name: "shutdownDuration",
  description: "",
  type: C.TYPE_TIMEOUT,
};

const GRUB_TIMEOUT: SettingsInfo = {
  title: "Grub timeout",
  name: "bootTimeout",
  description: "",
  type: C.TYPE_TIMEOUT_OR_NULL,
};

const CRYPT_DEVICE: SettingsInfo = {
  title: "Crypt device (root partition)",
  name: "cryptDevice",
  description: "",
  type: C.TYPE_STRING_OR_NULL,
};

const INITIAL_SCREEN: SettingsInfo = {
  title: "Initial screen",
  name: "initialScreen",
  description: "",
  type: C.TYPE_INITIAL_SCREEN,
};

const CHECK_DECRYPT_PASS_URL: SettingsInfo = {
  title: "Check disk password URL",
  name: "checkDecryptionPasswordUrl",
  description: "",
  type: C.TYPE_TEMPLATE_URL_PASS,
};

const CHECK_LOGIN_URL: SettingsInfo = {
  title: "Check login URL",
  name: "checkLoginCredentialsUrl",
  description: "",
  type: C.TYPE_TEMPLATE_URL_USER_PASS,
};

const URL_VERIFICATION_TIMEOUT: SettingsInfo = {
  title: "Server verification timeout",
  name: "serverRequestTimeout",
  description: "",
  type: C.TYPE_TIMEOUT,
};

const REGEX_DECRYPT_PASSWORD: SettingsInfo = {
  title: "Decryption password",
  name: "validDecryptionPasswordRegex",
  description: "",
  type: C.TYPE_REGEX,
};

const REGEX_LOGIN_USERNAME: SettingsInfo = {
  title: "Login username",
  name: "validLoginUsernameRegex",
  description: "",
  type: C.TYPE_REGEX,
};

const REGEX_LOGIN_PASSWORD: SettingsInfo = {
  title: "Login password",
  name: "validLoginPasswordRegex",
  description: "",
  type: C.TYPE_REGEX,
};


export const FIELDS_TIMING = [GRUB_GREETER_DURATION, KERNEL_DURATION,
  INITRD_DURATION, BOOT_LOGO_DURATION, SHUTDOWN_LOGO_DURATIION];
export const FIELDS_GENERAL = [HOSTNAME, INITIAL_SCREEN, GRUB_TIMEOUT, CRYPT_DEVICE];
export const FIELDS_CREDENTIAL_SERVER = [CHECK_DECRYPT_PASS_URL, CHECK_LOGIN_URL,
  URL_VERIFICATION_TIMEOUT];
export const FIELDS_CREDENTIAL_LOCAL = [REGEX_DECRYPT_PASSWORD, REGEX_LOGIN_USERNAME,
  REGEX_LOGIN_PASSWORD];

const ALL_SETTINGS = [...FIELDS_GENERAL, ...FIELDS_TIMING,
...FIELDS_CREDENTIAL_SERVER, ...FIELDS_CREDENTIAL_LOCAL];

export const SETTINGS_MAP = new Map<string, SettingsInfo>();
for (let s of ALL_SETTINGS) {
  SETTINGS_MAP.set(s.name, s);
}
