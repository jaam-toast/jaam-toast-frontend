export const COLORS = {
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

export type ColorKeys = typeof COLORS extends Record<infer U, string>
  ? U
  : never;
