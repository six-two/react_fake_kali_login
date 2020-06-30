export const DEBUG = true;

//TODO make this an user selectable option, make user choose cover
export const URL_SIMULATION = "/posts/2020/06/29/security_advice.html";
export const MARKER_CAN_BE_LEFT_EMPTY = "*";

export const PLACEHOLDER_USERNAME = "<username>";
export const PLACEHOLDER_PASSWORD = "<password>";

// action types
export const SET_LOGIN_USERNAME = "SET_LOGIN_USERNAME";
export const SET_LOGIN_PASSWORD = "SET_LOGIN_PASSWORD";
export const SET_SCREEN = "SET_SCREEN";
export const SET_HOSTNAME = "SET_HOSTNAME";
export const SET_LOGIN_OPEN_MENU = "SET_LOGIN_OPEN_MENU";
export const SET_GRUB_MAIN_SELECTED = "SET_GRUB_MAIN_SELECTED";
export const SET_GRUB_ADVANCED_SELECTED = "SET_GRUB_ADVANCED_SELECTED";
export const TRY_LOGIN = "TRY_LOGIN";
export const SET_KERNEL_AND_BOOT = "SET_KERNEL_AND_BOOT";
export const RESET_STATE = "RESET_STATE";
export const INITIAL_SETUP = "INITIAL_SETUP";
export const SET_SETUP_DONE = "SET_SETUP_DONE";//should only be used for browser history

// power related screen
export const SCREEN_OFF = "SCREEN_OFF";
export const SCREEN_HIBERNATE = "SCREEN_HIBERNATE";
export const SCREEN_SUSPEND = "SCREEN_SUSPEND";
export const SCREEN_SHUTDOWN = "SCREEN_SHUTDOWN";
export const SCREEN_REBOOT = "SCREEN_REBOOT";
// normal screens
export const SCREEN_LOGIN = "SCREEN_LOGIN";
export const SCREEN_DIALOG_SHUTDOWN = "SCREEN_DIALOG_SHUTDOWN";
export const SCREEN_DIALOG_REBOOT = "SCREEN_DIALOG_REBOOT";
export const SCREEN_GRUB = "SCREEN_GRUB";
export const SCREEN_GRUB_MENU = "SCREEN_GRUB_MENU";
export const SCREEN_GRUB_ADVANCED = "SCREEN_GRUB_ADVANCED";
export const SCREEN_CONSOLE_BOOTING = "SCREEN_CONSOLE_BOOTING";
export const SCREEN_PLYMOUTH_PASSWORD = "SCREEN_PLYMOUTH_PASSWORD";
export const SCREEN_PLYMOUTH_BOOT = "SCREEN_PLYMOUTH_BOOT";

// input types
export const TYPE_STRING = "TYPE_STRING";
export const TYPE_STRING_OR_NULL = "TYPE_STRING_OR_NULL";
export const TYPE_TIMEOUT = "TYPE_TIMEOUT";
export const TYPE_TIMEOUT_OR_NULL = "TYPE_TIMEOUT_OR_NULL";
export const TYPE_INITIAL_SCREEN = "TYPE_INITIAL_SCREEN";
export const TYPE_REGEX = "TYPE_REGEX";
export const TYPE_TEMPLATE_URL_PASS = "TYPE_TEMPLATE_URL_PASS";
export const TYPE_TEMPLATE_URL_USER_PASS = "TYPE_TEMPLATE_URL_USER_PASS";
export const TYPE_TODO = "TYPE_TODO";
