import { style } from "@vanilla-extract/css";

export const container = style({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  overflow: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});
