import { style } from "@vanilla-extract/css";
import { s } from "./styles";

export const container = style([
  s.flexColumn,
  s.scroll,
  {
    position: "fixed",
    height: "100vh",
    width: "100vw",
  },
]);
