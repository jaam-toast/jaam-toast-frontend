import { style } from "@vanilla-extract/css";
import { s } from "./styles";

export const container = style([
  s.flexColumn,
  s.flexSpaceBetween,
  s.scroll,
  {
    minHeight: "100vh",
    width: "100vw",
  },
]);
