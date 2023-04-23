import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.flexColumn,
  s.alignItemsCenter,
  s.border,
  s.pointer,
  {
    borderColor: colors.WHITE,
    minWidth: "7rem",
    maxWidth: "7rem",
    padding: "1rem 0",
    gap: "1rem",
    fontSize: "0.8rem",
    ":hover": {
      backgroundColor: colors.GREY_LIGHT,
    },
  },
]);
