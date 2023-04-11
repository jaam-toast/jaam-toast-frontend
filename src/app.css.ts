import { style } from "@vanilla-extract/css";
import { s } from "./styles";
import * as colors from "./config/colors";

export const container = style([
  s.flexColumn,
  s.flexSpaceBetween,
  s.scroll,
  {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    backgroundColor: colors.PAPER,
  },
]);
