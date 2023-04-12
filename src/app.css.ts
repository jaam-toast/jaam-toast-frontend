import { style } from "@vanilla-extract/css";
import { s } from "./@styles";
import * as colors from "./@config/colors";

export const container = style([
  s.flexColumn,
  s.scroll,
  {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: colors.PAPER,
  },
]);
