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
  type: C.TYPE_TIMEOUT,
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

// const EMPTY: SettingsInfo = {
//   title: "",
//   name: "",
//   description: "",
//   type: C.TYPE_TODO,
// };


export const FIELDS_TIMING = [KERNEL_DURATION, INITRD_DURATION, BOOT_LOGO_DURATION,
  SHUTDOWN_LOGO_DURATIION];
export const FIELDS_GENERAL = [HOSTNAME, INITIAL_SCREEN, GRUB_TIMEOUT, CRYPT_DEVICE];

const ALL_SETTINGS = [...FIELDS_GENERAL, ...FIELDS_TIMING];
export const SETTINGS_MAP = new Map<string, SettingsInfo>();
for (let s of ALL_SETTINGS) {
  SETTINGS_MAP.set(s.name, s);
}
