// * 수정중...

export const COLOR = {
  WHITE: "#FFFFFF",
  PAPER: "#F6F6F6",
  BLACK: "#000000",
  BLUE: "#03336a",
  GREY_LIGHT: "#f0f0f0",
  GREY: "#808080",
  GREY_CLEAR: "#d4d4d4",
  BLACK_OFF: "#444444",
  TAN: "#d2b48c",
  RED_LIGHT: "#ff9999",
  RED: "#ff0000",
  LEMON: "#FEECB7",
  MINT_LIGHT: "#ecfad7",
  MINT: "#E0F3C2",
  STRAWBERRY_LIGHT: "#ffebeb",
  STRAWBERRY: "#FF9999",
  LAVENDER_LIGHT: "#e8ecfa",
  LAVENDER: "#BAC7F7",
  LAVENDAR_DARK: "#4b6ff2",
};

export type ColorKeys = typeof COLOR extends Record<infer U, string>
  ? U
  : never;

export type ColorValue<K extends ColorKeys> = typeof COLOR[K];

export const WHITE = "#FFFFFF";

export const PAPER = "#F6F6F6";

export const BLACK = "#000000";

export const BLUE = "#03336a";

export const GREY_LIGHT = "#f0f0f0";

export const GREY = "#808080";

export const GREY_CLEAR = "#d4d4d4";

export const BLACK_OFF = "#444444";

export const TAN = "#d2b48c";

export const RED_LIGHT = "#ff9999";

export const RED = "#ff0000";

export const LEMON = "#FEECB7";

export const MINT_LIGHT = "#ecfad7";

export const MINT = "#E0F3C2";

export const STRAWBERRY_LIGHT = "#ffebeb";

export const STRAWBERRY = "#FF9999";

export const LAVENDER_LIGHT = "#e8ecfa";

export const LAVENDER = "#BAC7F7";

export const LAVENDAR_DARK = "#4b6ff2";
